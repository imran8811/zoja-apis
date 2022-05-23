const userMongoose = require('mongoose');

var Schema = userMongoose.Schema;

const userModel = new userMongoose.Schema ({
  type : {
    type : String,
    required : true
  },
  fullName : {
    type : String
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
  },
  religion : {
    type : String,
  },
  subReligion : {
    type : String
  },
  degreeLevel : {
    type : String,
  },
  degreeType : {
    type : String,
  },
  institute : {
    type : String,
  },
  professionType : {
    type : String,
  },
  jobTitle : {
    type : String
  },
  businessDetails : {
    type : String
  },
  income : {
    type : String,
  },
  age : {
    type : String,
  },
  status : {
    type : String,
  },
  noOfChildren : {
    type : Number,
  },
  complexion : {
    type : String,
  },
  weight : {
    type : String,
  },
  feet : {
    type : String,
  },
  inch : {
    type : String,
  },
  country : {
    type : String,
  },
  city : {
    type : String,
  },
  motherLanguage : {
    type : String,
  },
  caste : {
    type : String,
  },
  contactNo : {
    type : String,
  }
})

module.exports = userModel;