var express = require('express');
var app      = express();
var router  = express.Router();
var path    = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');
var r = require('rethinkdbdash')({
  host: 'localhost',
  port: 28015,
  db: 'testSite'
});

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

// // post new tasks
// app.post('/tasks', function(req, res) {
//  var currentTask = req.body;
//  r.table('tasks').insert({
//         name: currentTask.name,
//         task: currentTask.task
//     }).run(function(err, cursor) {
//         res.redirect('/');
//     }).error(function() {
//       console.log('Something with the POST method is broken.');
//     });
// });

// // update tasks
// app.patch('/tasks', function(req, res) {
//     var query = _.extend(req.body,req.params,req.query);
//     var id = query.id;
//     r.table('tasks').get(id).update(query).run(function(err, cursor) {
//       res.send(cursor);
//     }).error(function() {
//       console.log('Something with the PATCH method is broken.');
//     });
// });

// // delete tasks
// app.delete('/tasks', function(req, res) {
//     var currentId = req.query;
//     r.table('tasks').get(currentId.id).delete().run(function(err, cursor) {
//       res.json(200, cursor);
//     }).error(function() {
//       console.log('Something with the DELETE method is broken.');
//     });
// });

// // start up our server
// var server = app.listen(3000, function() {
//  var port = server.address().port;
//  var host = server.address().address;
//  console.log('Example app listening at http://%s:%s', host, port);
// });

