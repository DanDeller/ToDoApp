var assert = require("chai").assert;
var request = require('supertest');
var app = require('../app.js');


describe('api', function() {
  describe('task', function () {
    it('should return 200 on get request', function (done) {
              request(app)
              .get('/tasks')
              .expect(200, done);
    });
  });
});