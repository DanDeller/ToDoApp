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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

// get index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

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

// delete tasks
app.delete('/tasks', function(req, res) {
    var currentId = req.query;
    r.table('tasks').get(currentId.id).delete().run().then(function(tasks) {
        res.json(200, tasks);
    });
});

// update tasks
app.patch('/tasks', function(req, res) {
	var patchId = req.query;
	var patchItems = req.body;
	r.table('tasks').get(patchId.id).update({
		name: patchItems.name,
		task: patchItems.task
	}).run().then(function(tasks) {
		res.json(200, tasks);
	});
});

// start up our server
var server = app.listen(3000, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('Example app listening at http://%s:%s', host, port);
});

