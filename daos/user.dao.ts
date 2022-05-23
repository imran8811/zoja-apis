const mongooseUser = require('mongoose');

const userModelDAO = require('../models/user.model.ts');

userModelDAO.statics = {
  create : function(data, cb) {
    var user = new this(data);
    user.save(cb);
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

const userDAO = mongooseUser.model('users', userModelDAO);

module.exports = userDAO;
