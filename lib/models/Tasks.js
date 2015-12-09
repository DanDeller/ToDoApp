var express = require('express');
var app      = express();
var router  = express.Router();
var _ = require('lodash');
var r = require('../r.js');

// var db = 'people';

function errorHandler (err, result) { if (err) throw err; };

// r.connect({
//     host: 'localhost',
//     port: 28015
// },
// function(err, connection) {

//   // Creates database
//   r.dbCreate(db).
//     run(connection, errorHandler);

//   // Creates USERS table
//   r.db(db).tableCreate('people')
//     .run(connection, errorHandler);
// });

exports.list = function(request, callback) {
  r.table('tasks').run()
  .then(function(response) {
    callback(null,response);
  }).error(function(error) {
    callback(error);
  });
};

exports.post = function(request, callback) {
  var currentTask = request.body;
  r.table('tasks').insert({
    name: currentTask.name,
    task: currentTask.task
  }).then(function(response) {
    callback(null, response);
  }).error(function(error) {
    callback(error);
  });
};

exports.patch = function(request, callback) {
  var query = _.extend(request.body,request.params,request.query);
  var id = query.id;
  r.table('tasks').get(id).update(query).run()
  .then(function(response) {
    callback(null, response);
  }).error(function(error) {
    callback(error);
  });
};

exports.delete = function(request, callback) {
  var currentId = request.query;
  r.table('tasks').get(currentId.id).delete().run()
  .then(function(response) {
    callback(null, response);
  }).error(function(error) {
    callback(error);
  });
};
