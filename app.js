var express = require('express');
var app      = express();
var router  = express.Router();
var path    = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');
var requireDir = require('require-dir');
var r = require('./lib/r.js');
var config = require('./config');
var endpoints = requireDir('./lib/endpoints');
var cookieParser = require('cookie-parser');

app.use(cookieParser());

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