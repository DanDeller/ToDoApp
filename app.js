var express = require('express');
var app      = express();
var router  = express.Router();
var path    = require('path');
var bodyParser = require('body-parser');
var r = require('rethinkdbdash')({
	host: 'localhost',
	port: 28015,
	db: 'testSite'
});
var _ = require('lodash');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

// middlewear to check path and method
app.use(function(req,res,next) {
	console.log(req.path)
	console.log(req.method);
  	next();
});

// get index DON'T NEED THIS! FIND OUT WHY!
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/views/index.html'));
// });

// get all tasks
app.get('/tasks', function(req, res) {
	r.table('tasks').run().then(function(tasks) {
    		var todo = tasks;
    		res.json(200, tasks);
	}).error(function() {
	    	console.log('Something with the GET is broken...');
	});
});

// post new tasks
app.post('/tasks', function(req, res) {
	var currentTask = req.body;
	r.table('tasks').insert({name: currentTask.name, task: currentTask.task}).run(function() {
        	res.redirect('/');
	});
});

// update tasks
app.patch('/tasks', function(req, res) {
	var query = _.extend(req.body,req.params,req.query);
	var id = query.id;
 	r.table('tasks').get(id).update(query).run().then(function(tasks) {
 		res.send(tasks);
  	});
});

// delete tasks
app.delete('/tasks', function(req, res) {
	var currentId = req.query;
	r.table('tasks').get(currentId.id).delete().run().then(function(tasks) {
        	res.json(200, tasks);
    	});
});

// start up our server
var server = app.listen(3000, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('Example app listening at http://%s:%s', host, port);
});
