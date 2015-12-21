var express = require('express');
var router  = express.Router();
var Users =  require('../models/Users');
var r = require('../r.js');
var jwt  = require('jsonwebtoken');
var authenticateMiddleware = require('../middlewares/authenticate.js');
var config = require('../../config.js');

router.post('/users', authenticateMiddleware, function(req, res) {
	Users.create(req.body, function(error, response) {
		if (error) {
			return res.end();
		}
		res.json(response);
	});
});

router.post('/login', function(req, res) {
	Users.login(req.body, function(error, response) {
		if (error) {
			return res.end();
		}
		var expiresIn = 10000000000;
		var token = jwt.sign(response, config.secret, {
			expiresIn: expiresIn
		});
		res.cookie('token', token, {expires: new Date(Date.now() + expiresIn)});
		res.redirect('/#/tasks');
		// res.json(response);
	});
});

module.exports = router;