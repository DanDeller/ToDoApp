module.exports = require('rethinkdbdash')({
  host: process.env.RETHINKDB_PORT_28015_TCP_ADDR || '127.0.0.1',
  port: process.env.RETHINKDB_PORT_28015_TCP_PORT || 28015,
  db: 'testSite',
  buffer: 2,
  max: 5,
  timeout: 5
});