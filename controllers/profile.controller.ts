const profileDAOCont = require('../daos/profile.dao.ts');

export const createProfile = (req, res) => {
  const calculateProfileScore = (requestData) => {
    const countFilledEnteries = [];
    for(const key in requestData) {
      if(requestData[key] != '') {
        countFilledEnteries.push(requestData[key])
      }
    }
    return countFilledEnteries.length*4;
  }

  const newRequestData = {...req.body, profileScore: String(calculateProfileScore(req.body))}

  const profile = new profileDAOCont(newRequestData);

  profile.save()
    .then((data) => {
      const { _id, type, memberShip, fullName } = data;
      if(data) {
        res.send({
          type: "success",
          message : "Profile Created",
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

export const findOneProfile = (req, res) => {
  profileDAOCont.findOne({_id: req.params.id})
    .then(data  => {
      if(data){
        const { type, fullName, email } = data;
        res.status(200).send({
          data : { type, fullName, email },
          type : 'success',
          message : '',
        });
      } else {
        res.status(400).send({
          type: "error",
          message: "profile Not Found"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

export const searchProfiles = (req, res) => {
  let filters = {};
  if(req.body.ageFrom || req.body.ageTo) {
    const newBody = {...req.body, age : req.body.ageFrom}
    delete newBody['ageFrom'];
    delete newBody['ageTo'];
    filters = {...newBody, age : { $gt : req.body.ageFrom? req.body.ageFrom-1 : 18, $lt : req.body.ageTo? req.body.ageTo+1 : 60}}
  } else {
    filters = {...req.body, profileScore: {$gt : 90}};
  }
  profileDAOCont.find(filters)
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

export const updateOneProfile = (req, res) => {
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

  profileDAOCont.updateOne({_id: req.body._id}, newRequestData, { returnOriginal: false })
    .then(async(data) => {
      if(data) {
        res.send({
          type: "success",
          message : "profile Updated Successfully",
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