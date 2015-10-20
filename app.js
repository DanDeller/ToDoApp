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

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('superSecret', config.secret);
_.each(endpoints,function(middleware, name) {
  app.use(middleware);
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
app.use(function(req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}	
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