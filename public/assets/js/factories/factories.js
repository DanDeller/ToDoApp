/**
* @name taskFactory
* @description timeout for focus event/get tasks/set tasks
* @param $http, $q, $timeout, $window
* @return taskFactory(id)/storage
*/
danApp.factory('taskFactory', function($http, $q, $timeout, $window) {

  return {
    focusIt: focusIt
  };

  function focusIt(id) {
    $timeout(function() {
      var element = $window.document.getElementById(id);
      if (element)
        element.focus();
    });
    return focusIt;
  }

  // var storage = {};
  // function storage(callback) {
  //   if (!storage.storedData) {
  //     return $http.get('/tasks').then(function(res) {
  //       storage.storedData = res.data;
  //       return storage.storedData;
  //     }).then(callback)
  //   } else {
  //     var def = $q.defer();
  //     def.done(callback);
  //     defer.resolve(storage.storedData);
  //     return def.promise;
  //   }
  //   return storage;
  // }

  // function setIt(obj) {
  //   storage.storedData.push(obj);
  //   return setIt;
  // }

});