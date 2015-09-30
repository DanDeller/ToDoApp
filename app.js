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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

// middleware
app.use(function(req,res,next) {
  // console.log(req.path)
  // console.log(req.method);
  next();
});

// get index DON'T NEED THIS! FIND OUT WHY!
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

// get all tasks
app.get('/tasks', function(req, res) {
    r.table('tasks').run(function(err, cursor) {
      var todo = cursor;
        res.json(200, cursor);
      }).error(function() {
    		console.log('Something with the GET method is broken.');
    });
});

// post new tasks
app.post('/tasks', function(req, res) {
	var currentTask = req.body;
	r.table('tasks').insert({
        name: currentTask.name,
        task: currentTask.task
    }).run(function(err, cursor) {
        res.redirect('/');
    }).error(function() {
      console.log('Something with the POST method is broken.');
    });
});

// update tasks
app.patch('/tasks', function(req, res) {
    var query = _.extend(req.body,req.params,req.query);
    var id = query.id;
    r.table('tasks').get(id).update(query).run(function(err, cursor) {
      res.send(cursor);
    }).error(function() {
      console.log('Something with the PATCH method is broken.');
    });
});

// delete tasks
app.delete('/tasks', function(req, res) {
    var currentId = req.query;
    r.table('tasks').get(currentId.id).delete().run(function(err, cursor) {
      res.json(200, cursor);
    }).error(function() {
      console.log('Something with the DELETE method is broken.');
    });
});

// start up our server
var server = app.listen(3000, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('Example app listening at http://%s:%s', host, port);
});

