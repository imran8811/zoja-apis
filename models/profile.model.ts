const profileMongoose = require('mongoose');

var Schema = profileMongoose.Schema;

const profileModel = new profileMongoose.Schema ({
  userId : {
    type: String,
    required : true
  },
  religion : {
    type : String,
    required : true
  },
  degreeLevel : {
    type : String,
    required : true
  },
  degreeType : {
    type : String,
  },
  institute : {
    type : String,
  },
  professionType : {
    type : String,
    required : true
  },
  jobTitle : {
    type : String,
  },
  businessDetails : {
    type : String,
  },
  income : {
    type : String,
    required : true
  },
  age : {
    type : String,
    required : true
  },
  status : {
    type : String,
    required : true
  },
  noOfSons : {
    type : Number,
  },
  noOfDaughters : {
    type : Number,
  },
  complexion : {
    type : String,
    required : true
  },
  weight : {
    type : String,
    required : true
  },
  feet : {
    type : String,
    required : true
  },
  inch : {
    type : String,
    required : true
  },
  country : {
    type : String,
    required : true
  },
  city : {
    type : String,
    required : true
  },
  motherLanguage : {
    type : String,
    required : true
  },
  caste : {
    type : String,
    required : true
  },
  contactNo : {
    type : String,
    required : true
  },
  requirements : {
    type : String,
    required : true
  }
})

module.exports = profileModel;