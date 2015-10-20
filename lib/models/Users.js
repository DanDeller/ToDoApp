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

// exports.checkUser = function(request, callback) {
//   // find the user
//   var name = request.body.email;
//   r.table('users').get(name).run()
//   .then(function(err, user) {
//     if (err) throw err;

//     if (!user) {
//       res.json({ success: false, message: 'Authentication failed. User not found.' });
//     } else if (user) {

//       // check if password matches
//       if (user.password != req.body.password) {
//         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
//       } else {

//         // if user is found and= password is right
//         // create a token
//         var token = jwt.sign(user, app.get('superSecret'), {
//           expiresInMinutes: 1440 // expires in 24 hours
//         });

//         // return the information including token as JSON
//         res.json({
//           success: true,
//           message: 'Enjoy your token!',
//           token: token
//         });
//       }   
//     }
//   }).error(function(error) {
//     console.log('Something with the user.js file busted' + error);
//   });
// };

