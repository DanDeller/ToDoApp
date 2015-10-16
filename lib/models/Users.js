var express = require('express');
var app      = express();
var router  = express.Router();
var path    = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');
var bcrypt = require('bcrypt');
var r = require('../r.js');

exports.create = function(request, callback) {
  var newUser = request.body; // move this

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err) {
        return callback(err);
      }
      r.table('users').insert({
        username: newUser.email,
        password: hash
      }).then(function(response) {
        callback(null, response);
      }).error(function(error) {
        callback(error);
      });
    });
  });
};

exports.login = function(request, callback) {
  r.table('users').filter({email: request.email})
  .then(function(response) {
    bcrypt.compare(request.password, response.password, function(err, res) {
      if (err) {
        return callback(err)
      }
      if (!res) {
        return callback(new Error('Bad Request'));
      }
      callback(null, response);
    });
  }).error(function(error) {
    callback(error);
  });

};

