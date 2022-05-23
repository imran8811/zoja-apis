const favouriteDAOCont = require('../daos/favourite.dao.ts');
const userDAOCont1 = require('../daos/user.dao.ts');

export const createFavourite = (req, res) => {
  if(!req.body.listingId || !req.body.userId){
    return res.status(400).send({
      message : "All field are required"
    })
  }

  userDAOCont1.findOne({_id : req.body.userId})
    .then(data => {
      if(data) {
        const user = new favouriteDAOCont({
          listingId : req.body.listingId,
          userId : req.body.userId,
        })
      
        user.save()
          .then((data) => {
            if(data) {
              res.send({
                type: "success",
                message : "Favourite Added Successfully",
                data : data
              })
            }
          })
          .catch((err) => {
            res.status(200).send({
              code : err.code,
              message : err.message,
              data : data
            })
          })
      }
  }).catch(err => {
    res.status(200).send({
      code : err.code,
      message : err.message
    })
  })
}

export const deleteFavourite = (req, res) => {
  favouriteDAOCont.remove({listingId: req.params.listingId, userId: req.params.userId})
    .then((data) => {
      if(data) {
        res.send({
          type: "success",
          message : "Favourite Deleted Successfully",
          data : data
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        type: 'error',
        message : err.message || "some error occured"
      })
    })
}

export const findFavourite = (req, res) => {
  const filters = req.body;
  favouriteDAOCont.find(filters)
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
          message: ""
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .send({ 
          type: "error",
          message: err.message
        });
    });
}

export const findOneFavourite = (req, res) => {
  favouriteDAOCont.findOne({favouriteId: req.params.favouriteId})
    .then((data)  => {
      if (!data)
        res.status(404).send({
          type: 'error',
        });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ 
        type: "error",
        message: err.message
      })
    });
}

export default { createFavourite, deleteFavourite, findFavourite, findOneFavourite }
