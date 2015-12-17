module.exports = require('rethinkdbdash')({
  host: process.env.RETHINKDB_PORT_28015_TCP_ADDR || '127.0.0.1',
  port: process.env.RETHINKDB_PORT_28015_TCP_PORT || 28015,
  db: 'todoApp'
});

// var express = require('express');
// var r = require('rethinkdb');
// module.exports = function(cb) {
//   var connection = null;
//   r.connect({
//     host: 'localhost',
//     port: 28015,
//     db: 'testSite'
//   }, function(err, conn) {
//       // console.log(conn)
//       if (err) throw err;
//       connection = conn;
//   });
// };