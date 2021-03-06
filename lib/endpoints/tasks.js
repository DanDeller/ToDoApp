var express = require('express');
var router  = express.Router();
var Tasks =  require('../models/Tasks');

router.get('/tasks', function(req, res) {
  Tasks.list(req, function(error,response) {
    if(error) {
      return res.end();
    }
    res.send(response);
   });
});

router.post('/tasks', function(req, res) {
  Tasks.post(req, function(error, response) {
    if (error) {
      return res.end();
    }
    res.send(response);
  });
});

router.patch('/tasks', function(req, res) {
  Tasks.patch(req, function(error, response) {
    if (error) {
      return res.end();
    }
    res.send(response);
  });
});

router.delete('/tasks', function(req, res) {
  Tasks.delete(req, function(error, response) {
    if (error) {
      return res.end();
    }
    res.send(response);
  });
});

module.exports = router;
