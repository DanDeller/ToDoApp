var express = require('express');
var app      = express();
var router  = express.Router();
var path    = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');
var requireDir = require('require-dir');
var r = require('rethinkdbdash')({
	host: 'localhost',
	port: 28015,
	db: 'testSite'
});

var endpoints = requireDir('./lib/endpoints');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));

// middleware
app.use(function(req, res, next) {
  next();
});

app.use(endpoints.tasks);

// start up our server
var server = app.listen(3000, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;