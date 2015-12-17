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
var async = require('async');
var r = require('./lib//r.js');

var config = require(__dirname + '/config.js');

app.use(cookieParser());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use(express.static(path.join(__dirname, './public')))
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

async.waterfall([
  function connect(callback) {
    r.connect(config.rethinkdb, callback);
  },
  function createDatabase(connection, callback) {
    //Create the database if needed.
    r.dbList().contains(config.rethinkdb.db).do(function(containsDb) {
      return r.branch(
        containsDb,
        {created: 0},
        r.dbCreate(config.rethinkdb.db)
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createTable(connection, callback) {
    //Create the table if needed.
    r.tableList().contains('tasks').do(function(containsTable) {
      return r.branch(
        containsTable,
        {created: 0},
        r.tableCreate('tasks')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
    r.tableList().contains('users').do(function(containsTable) {
      return r.branch(
        containsTable,
        {created: 0},
        r.tableCreate('users')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
    r.tableList().contains('userImage').do(function(containsTable) {
      return r.branch(
        containsTable,
        {created: 0},
        r.tableCreate('userImage')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createIndex(connection, callback) {
    //Create the index if needed.
    r.table('tasks').indexList().contains('createdAt').do(function(hasIndex) {
      return r.branch(
        hasIndex,
        {created: 0},
        r.table('tasks').indexCreate('createdAt')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
    r.table('users').indexList().contains('createdAt').do(function(hasIndex) {
      return r.branch(
        hasIndex,
        {created: 0},
        r.table('users').indexCreate('createdAt')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
    r.table('userImage').indexList().contains('createdAt').do(function(hasIndex) {
      return r.branch(
        hasIndex,
        {created: 0},
        r.table('userImage').indexCreate('createdAt')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function waitForIndex(connection, callback) {
    //Wait for the index to be ready.
    r.table('tasks').indexWait('createdAt').run(connection, function(err, result) {
      callback(err, connection);
    });
    r.table('users').indexWait('createdAt').run(connection, function(err, result) {
      callback(err, connection);
    });
    r.table('userImage').indexWait('createdAt').run(connection, function(err, result) {
      callback(err, connection);
    });
  }
], function(err, connection) {
  if(err) {
    console.error(err);
    process.exit(1);
    return;
  }
});

module.exports = app;