var _ = require('lodash');
var r = require('../r.js');

exports.list = function(request, callback) {
  r.table('userImage').run()
  .then(function(response) {
    callback(null,response);
  }).error(function(error) {
    callback(error);
  });
};

exports.post = function(request, callback) {
  var currentImage = request.body;
  r.table('userImage').insert({
    userImage: currentImage
  }).then(function(response) {
    callback(null, response);
  }).error(function(error) {
    callback(error);
  });
};

exports.patch = function(request, callback) {
  var query = _.extend(request.body,request.params,request.query);
  var id = query.id;
  r.table('userImage').get(id).update(query).run()
  .then(function(response) {
    callback(null, response);
  }).error(function(error) {
    callback(error);
  });
};

exports.delete = function(request, callback) {
  var currentId = request.query;
  r.table('userImage').get(currentId.id).delete().run()
  .then(function(response) {
    callback(null, response);
  }).error(function(error) {
    callback(error);
  });
};
