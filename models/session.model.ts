const sessionMongoose = require('mongoose');

var Schema = sessionMongoose.Schema;

const sessionModel = new sessionMongoose.Schema ({
  token : {
    type : String,
    required : true
  },
  created_at : {
    type: Date,
    required : true,
    default : new Date()
  },
  updated_at : {
    type: Date,
    required : true,
    default : new Date()
  }
})

module.exports = sessionModel;