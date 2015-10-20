var express = require('express');
var app      = express();
var router  = express.Router();
var path    = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');
var Users =  require('../models/Users');
var r = require('../r.js');
var jwt    = require('jsonwebtoken');
var authenticateMiddleware = require('../middlewares/authenticate.js');
var config = require('../../config.js');

router.post('/users', authenticateMiddleware, function(req, res) {
   // var newUser = req.body; // move this
	Users.create(req.body, function(error, response) {
		if (error) {
			return res.end();
		}
		res.redirect('/');
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
        res.json(response);
    });
});

module.exports = router;