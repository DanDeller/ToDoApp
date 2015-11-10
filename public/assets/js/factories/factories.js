/**
* @name taskFactory
* @description timeout for focus event/get tasks/set tasks
* @param $http, $q, $timeout, $window
* @return taskFactory(id)/storage
*/
danApp.factory('taskFactory', function($http, $q, $timeout, $window) {

  return function(id) {
    $timeout(function() {
      var element = $window.document.getElementById(id);
      if(element)
        element.focus();
    });
  };

  var storage = {};
  storage.get = function(callback) {
    if (!storage.storedData) {
      return $http.get('/tasks').then(function(res) {
        storage.storedData = res.data;
        return storage.storedData;
      }).then(callback)
    } else {
      var def = $q.defer();
      def.done(callback);
      defer.resolve(storage.storedData);
      return def.promise;
    }
  }
  storage.set = function(obj) {
      storage.storedData.push(obj);
  }
  return storage;

});