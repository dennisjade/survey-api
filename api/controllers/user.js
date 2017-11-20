'use strict';

const userModel = require('../models/user');

function addUser(req, res) {
  let data = req.swagger.params.userdata.value;
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };
  userModel
    .add(data)
    .then(doc => {
      ret.data = doc;
      res.json(ret);
    })
    .catch(err => {
      res.status(500).json(ret);
    })
}

function updateUser(req, res) {
  let data = req.swagger.params.userdata.value;
  let key = req.swagger.params.key.value;
  delete data.key;
  delete data._id;
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };
  userModel
    .update(data, key)
    .then(doc => {
      ret.data = doc;
      res.json(ret);
    })
    .catch(err => {
      res.status(500).json(ret);
    })
}

function deleteUser(req, res) {
  let key = req.swagger.params.key.value;
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };
  userModel
    .delete(key)
    .then(doc => {
      ret.data = doc;
      res.json(ret);
    })
    .catch(err => {
      res.status(500).json(ret);
    })
}

function listUsers(req, res) {
  let ret = {
    status: 200,
    message: 'Success',
    data: {}
  };

  userModel
    .list()
    .then(doc => {
      ret.data = doc;
      res.json(ret);
    })
}
module.exports = {
  addUser: addUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  listUsers: listUsers
};