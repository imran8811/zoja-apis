var bcrypt = require('bcryptjs');
const userDAOCont = require('../daos/user.dao.ts');
const favouriteDAOCont = require('../daos/favourite.dao.ts');
const nodemailer = require('nodemailer');

export const createProfile = (req, res) => {
  if( 
    !req.body.type || 
    !req.body.fullName || 
    !req.body.email || 
    !req.body.password 
    ){
    return res.status(400).send({
      message : "type, full name, email and password fields are required"
    })
  }
  const saltRounds = 10;

  const calculateProfileScore = (requestData) => {
    const totalEntries = 20;
    const countFilledEnteries = [];
    for(const key in requestData) {
      if(requestData[key] != '') {
        countFilledEnteries.push(requestData[key])
      }
    }
    return countFilledEnteries.length*4;
  }

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPass = bcrypt.hashSync(req.body.password, salt);

  const newRequestData = {...req.body, password: hashedPass, profileScore: String(calculateProfileScore(req.body))}

  const user = new userDAOCont(newRequestData);

  user.save()
    .then((data) => {
      const { _id, type, memberShip, fullName } = data;
      if(data) {
        res.send({
          type: "success",
          message : "User Registered Successfully",
          data : { _id, fullName, type, favourites: [], memberShip: memberShip }
        })
      }
    })
    .catch((err) => {
      res.status(200).send({
        code : err.code,
        message : err.message
      })
    })
}

export const searchUsers = (req, res) => {
  let filters = {};
  if(req.body.ageFrom || req.body.ageTo) {
    const newBody = {...req.body, age : req.body.ageFrom}
    delete newBody['ageFrom'];
    delete newBody['ageTo'];
    filters = {...newBody, age : { $gt : req.body.ageFrom? req.body.ageFrom-1 : 18, $lt : req.body.ageTo? req.body.ageTo+1 : 60}}
  } else {
    filters = {...req.body, profileScore: {$gt : 90}};
  }
  userDAOCont.find(filters)
    .then((data) => {
      if (!data)
        res.status(404).send({
          type: 'error',
          message : 'No Record Found'
        });
      else {
        res.send({
          data: data,
          type: "success",
          message: "",
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ 
          type: "error",
          message: err.message,
          err : err
        });
    });
}

export const loginUser = (req, res) => {
  userDAOCont.findOne({email: req.body.email})
    .then(async(data)  => {
      const { _id, membership, profileScore, fullName } = data;
      req.session.userId = _id;
      if(await bcrypt.compare(req.body.password, data.password)){
        // req.send(req.session)
        favouriteDAOCont.find({userId : _id}).then(favs => {
          res.status(200).send({
            data : { _id, membership, profileScore, fullName },
            type : 'success',
            message : 'Logged in',
            favourites : favs,
          });
        })
      } else {
        res.status(200).send({
          type: "error",
          message: "Invalid Credentials"
        });
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
}

export const findOneUser = (req, res) => {
  userDAOCont.findOne({_id: req.params.id})
    .then(data  => {
      if(data){
        res.status(200).send({
          data : { ...data._doc },
          type : 'success',
          message : '',
        });
      } else {
        res.status(400).send({
          type: "error",
          message: "User Not Found"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

export const updateOneUser = (req, res) => {
  
  const calculateProfileScore = (requestData) => {
    const totalEntries = 20;
    const countFilledEnteries = [];
    for(const key in requestData) {
      if(requestData[key] != '') {
        countFilledEnteries.push(requestData[key])
      }
    }
    return countFilledEnteries.length*4;
  }

  const newRequestData = {...req.body, profileScore: String(calculateProfileScore(req.body))}

  userDAOCont.updateOne({_id: req.body._id}, newRequestData, { returnOriginal: false })
    .then(async(data) => {
      if(data) {
        res.send({
          type: "success",
          message : "User Updated Successfully",
          data : data,
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message : err.message
      });
    });
}

export const logout = (req, res) => {
  res.status(200).send({
    type: "success"
  })
}

export const passResetEmail = (req, res) => {
  userDAOCont.findOne({email: req.body.email})
    .then(async data  => {
      if(data){
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: 'm.imran8811@gmail.com', // generated ethereal user
            pass: 'dcdnaenhktltvabn', // generated ethereal password
          },
          tls: {
            rejectUnauthorized: false
          }
        })
      
        let info = await transporter.sendMail({
          from: '"Myshadi.pk" <m.imran8811@gmail.com>', // sender address
          to: req.body.email, // list of receivers
          subject: "Password reset link", // Subject line
          text: "Password reset link", // plain text body
          html: "<a href='/forgot-password'>Password Reset Link, Click Here</a>", // html body
        });
      
        res.send({
          type: 'success',
          message: 'Email sent'
        });
      } else {
        res.send({
          type: "error",
          message: "User Not Found"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

export const passReset = (req, res) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPass = bcrypt.hashSync(req.body.password, salt);

  userDAOCont.updateOne({email: req.body.email}, {password : hashedPass }, { returnOriginal: false })
    .then(data  => {
      if(data){
        res.send({
          type: 'success',
          message: 'Password has been reset successfully'
        });
      } else {
        res.send({
          type: "error",
          message: "Server Error"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

export const checkEmailValidity = (req, res) => {
  userDAOCont.findOne({email: req.body.email})
    .then(data => {
      if(data){
        res.send({
          type: "success",
          message: "Email Valid"
        })
      } else {
        res.send({
          type: "error",
          message: "Email not valid"
        })
      }
    })
}