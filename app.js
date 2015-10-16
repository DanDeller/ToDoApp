var express = require('express');
var app      = express();
var router  = express.Router();
var path    = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');
var requireDir = require('require-dir');
var jwt    = require('jsonwebtoken');
var r = require('rethinkdbdash')({
	host: 'localhost',
	port: 28015,
	db: 'testSite'
});

var endpoints = requireDir('./lib/endpoints');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
_.each(endpoints,function(middleware, name) {
  app.use(middleware);
});

// start up our server
var server = app.listen(3000, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;

// TEMPLATE STUFF
// app.set('view engine', 'ejs');
// app.get('/', function(req, res) {
//   res.render('login', {user: "Dan"});
// });