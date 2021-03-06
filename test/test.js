var assert = require("chai").assert;
var request = require('supertest');
var should = require('should');
var assert = require('assert');
var app = require('../app.js');

describe('api', function() {
  describe('task', function () {

    it('should return 200 on GET', function (done) {
      request(app)
      .get('/tasks')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('should return 200 on POST', function (done) {
      request(app)
      .post('/tasks')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('should return 200 on PATCH', function (done) {
      request(app)
      .patch('/tasks')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

    it('should return 200 on DELETE', function (done) {
      request(app)
      .delete('/tasks')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });

  });
});