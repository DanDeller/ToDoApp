var async = require('async');
var r = require('./r.js');
var config = require('../config');

exports.setDatabaseAndTables = function() {
	async.waterfall([
  function connect(callback) {
    r.connect(config.rethinkdb, callback);
  },
  function createDatabase(connection, callback) {
    // Create the database if needed.
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
    // Create the table if needed.
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
    // Create the index if needed.
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
    // Wait for the index to be ready.
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
};