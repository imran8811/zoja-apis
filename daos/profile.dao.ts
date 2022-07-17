const mongooseProfile = require('mongoose');

const profileModelDAO = require('../models/profile.model.ts');

profileModelDAO.statics = {
  create : function(data, cb) {
    var profile = new this(data);
    profile.save(cb);
  },

  get: function(query, cb) {
    this.findOne(query, cb);
  },

  getById: function(query, cb) {
    this.find(query, cb);
  },

  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, {$set: updateData}, {new: true}, cb);
  },

  updateOneDocument: function(filter, updateData, cb) {
    this.updateOne(filter, {$set: updateData}, {new: true}, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
}

const profileDAO = mongooseProfile.model('profiles', profileModelDAO);

module.exports = profileDAO;
