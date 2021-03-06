var bcrypt = require('bcrypt');
var r = require('../r.js');

exports.create = function(request, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return callback(err);
    }
    bcrypt.hash(request.password, salt, function(err, hash) {
      if (err) {
        return callback(err);
      }
      r.table('users').insert({
        username: request.username,
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
  r.table('users').filter({username: request.username})
  .then(function(response) {
    var user = response[0];
    bcrypt.compare(request.password, user.password, function(err, res) {
      if (err) {
        return callback(err)
      }
      if (!res) {
        return callback(new Error('Bad Request'));
      }
      callback(null, response);
      console.log('Logged in as ' + request.username);
    });
  }).error(function(error) {
    callback(error);
  });
};