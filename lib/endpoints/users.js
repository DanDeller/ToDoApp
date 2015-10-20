var express    = require('express');
var app        = express();
var router     = express.Router();
var path       = require('path');
var bodyParser = require('body-parser');
var _          = require('lodash');
var Users      = require('../models/Users');
var r          = require('../r.js');
var jwt        = require('jsonwebtoken');

router.post('/users', function(req, res) {
	
	// find the user
  var name = req.body.email;
  r.table('users').get(name).run()
  .then(function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ 
        	success: false, 
        	message: 'Authentication failed. Wrong password.' 
        });
      } else {
        // if user is found and= password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  }).error(function(error) {
    console.log('Something with the user.js file busted' + error);
  });

	Users.checkUser(req, function(error, response) {
		if (error) {
			return res.end();
		}
		res.redirect('/');
	});


	Users.create(req, function(error, response) {
		if (error) {
			return res.end();
		}
		res.redirect('/');
	});
});

module.exports = router;