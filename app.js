var express = require('express');
var app      = express();
var path     = require('path');
var bodyParser = require('body-parser');
var handleBars = require('express-handlebars');
var r = require('rethinkdbdash')({
	host: 'localhost',
	port: 28015,
	db: 'testSite'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/tasks', function(req, res) {
    r.table('tasks').run().then(function(tasks) {
    		res.json(200, tasks);
    }).error(function() {
    		console.log('Something with the GET is broken...');
    });
});

// app.post('/tasks', function(req, res) {
// 	console.log(req.body);
// 	r.table('tasks').insert({name: "dan"}).run();
// });

// app.delete('/tasks', function(req, res) {
// 	r.table('tasks')
// });

var server = app.listen(3000, function() {
	var port = server.address().port;
	var host   = server.address().address;
	console.log('Example app listening at http://%s:%s', host, port);
});