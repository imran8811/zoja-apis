const favouriteMongoose = require('mongoose');

var Schema = favouriteMongoose.Schema;

const favouriteModel = new favouriteMongoose.Schema ({
  userId : {
    type : String
  },
  listingId : {
    type : String
  }
})

module.exports = favouriteModel;