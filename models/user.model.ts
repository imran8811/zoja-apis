const userMongoose = require('mongoose');

var Schema = userMongoose.Schema;

const userModel = new userMongoose.Schema ({
  type : {
    type : String,
    required : true
  },
  fullName : {
    type : String,
    required : true
  },
  email : {
    type : String,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  profileScore : {
    type: Number,
    required : true,
    default: 0
  },
  membership : {
    type : Boolean,
    required : true,
    default : false
  },
  joined_at : {
    type: Date,
    required : true,
    default : new Date()
  },
  state : {
    type : Number,
    required : true,
    default : 0
  }
})

module.exports = userModel;