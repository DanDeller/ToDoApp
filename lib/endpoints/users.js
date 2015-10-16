var express = require('express');
var app      = express();
var router  = express.Router();
var path    = require('path');
var bodyParser = require('body-parser');
var _ = require('lodash');
var Users =  require('../models/Users');
var r = require('../r.js');

router.post('/users', function(req, res) {
  Users.create(req, function(error, response) {
    if (error) {
      return res.end();
    }
    res.redirect('/');
  });
});

module.exports = router;