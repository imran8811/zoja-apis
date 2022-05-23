const mongoosefavourite = require('mongoose');

const favouriteModelDAO = require('../models/favourite.model.ts');

favouriteModelDAO.statics = {
  create : function(data, cb) {
    var favourite = new this(data);
    favourite.save(cb);
  },

  get: function(query, cb) {
    this.find(query, cb);
  },

  getById: function(query, cb) {
    this.find(query, cb);
  },

  updateOne: function(filter, updateData, cb) {
    this.updateOne(filter, {$set: updateData}, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
}

const favouriteDAO = mongoosefavourite.model('favourites', favouriteModelDAO);

module.exports = favouriteDAO;
