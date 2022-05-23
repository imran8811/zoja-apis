const updateMongoose = require('mongoose');

var Schema = updateMongoose.Schema;

const updateModel = new updateMongoose.Schema ({
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
  area : {
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

module.exports = updateModel;