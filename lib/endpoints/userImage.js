var express = require('express');
var app      = express();
var router  = express.Router();
var UserImage =  require('../models/UserImage');
var r = require('../r.js');

router.get('/userImage', function(req, res) {
  UserImage.list(req, function(error,response) {
    if(error) {
      return res.end();
    }
    res.send(response);
   });
});

router.post('/userImage', function(req, res) {
  UserImage.post(req, function(error, response) {
    if (error) {
      return res.end();
    }
    res.send(response);
  });
});

router.patch('/userImage', function(req, res) {
  UserImage.patch(req, function(error, response) {
    if (error) {
      return res.end();
    }
    res.send(response);
  });
});

router.delete('/userImage', function(req, res) {
  UserImage.delete(req, function(error, response) {
    if (error) {
      return res.end();
    }
    res.send(response);
  });
});

module.exports = router;