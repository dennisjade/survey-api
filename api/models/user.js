'use strict';

var Promise = require('bluebird');
var model = require('../models/schema');

function add(data) {
  return Promise
    .try(() => {
      let userDate = new model.user(data, false);
      return userDate.save()
        .then(doc => {
          return doc;
        })
    })
}

function update(newData, key) {
  return Promise
    .try(() => {
      let q = {
        _id: key
      };
      return model.user.update(q, newData)
        .then(doc => {
          return doc;
        })
    })
    .catch(err => {
      throw err;
    })
}

function _delete(key) {
  return Promise
    .try(() => {
      let q = {
        _id: key
      };
      model.user.remove(q)
        .then(doc => {
          return doc;
        })
    })
}

function list() {
  return Promise
    .try(() => {
      return model.user.find({})
        .then(doc => {
          return doc.map(item => {
            let _item = item;
            _item._doc.key = _item._doc._id.toString();
            return _item._doc;
          });
        })
    })
}

module.exports = {
  add: add,
  update: update,
  delete: _delete,
  list: list,
};