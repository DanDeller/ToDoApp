var express = require('express');
var app      = express();
var router  = express.Router();
var _ = require('lodash');
var r = require('../r.js');

function errorHandler (err, result) { if (err) throw err; };

// r.connect({
//     host: process.env.RETHINKDB_PORT_28015_TCP_ADDR || '127.0.0.1',
//     port: process.env.RETHINKDB_PORT_28015_TCP_PORT || 28015,
// },
// function(err, connection) {

//   r.dbList().contains('testSite2').do(r.branch(r.row, r.db('testSite2'), r.do(function(){
//     return r.dbCreate('testSite2').do(function(){
//       return r.db('testSite2');
//     });
//   }));

//   // r.dbCreate('testSite2').
//   //   run(connection, errorHandler);

//   // r.db('testSite').tableCreate('userImages')
//   //   .run(connection, errorHandler);

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
