var assert = require("chai").assert;
var request = require('supertest');
var should = require('should');
var assert = require('assert');
var app = require('../app.js');


describe('api', function() {
  describe('task', function () {

    it('should return 200 on GET', function (done) {
      // this.timeout = 10000;

      request(app)
      .get('/tasks')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

  });
});