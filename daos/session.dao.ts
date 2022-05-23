const mongooseSession = require('mongoose');

const sessionModelDAO = require('../models/session.model.ts');

sessionModelDAO.statics = {
  create : function(data, cb) {
    var session = new this(data);
    session.save(cb);
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

const sessionDAO = mongooseSession.model('sessions', sessionModelDAO);

module.exports = sessionDAO;
