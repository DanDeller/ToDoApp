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
var Tasks =  require('../models/Tasks');


router.get('/tasks', function(req, res) {
   Tasks.list(req, function(error,response) {
    if(error) {
        return res.end();
    }
    res.send(response);
   });
});

router.post('/tasks', function(req, res) {
    Tasks.post(req, function(error, response) {
        if (error) {
            return res.end();
        }
        res.send(response);
    });
});

// // get all tasks
// app.get('/tasks', function(req, res) {
//     r.table('tasks').run(function(err, cursor) {
//       var todo = cursor;
//         res.json(200, cursor);
//       }).error(function() {
//             console.log('Something with the GET method is broken.');
//     });
// });

// // post new tasks
// app.post('/tasks', function(req, res) {
//     var currentTask = req.body;
//     r.table('tasks').insert({
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


module.exports = router;