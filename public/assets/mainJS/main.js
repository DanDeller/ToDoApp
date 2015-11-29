var danApp = angular.module('danApp', ['ngRoute', 'ngAnimate', 'ngResource']);

danApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'views/login.html',
    controller  : 'mainController'
  })
  .when('/tasks', {
    templateUrl : 'views/todo.html',
    controller  : 'tasksController'
  })
  .otherwise({
    redirectTo : '/'
  });
});
danApp.controller('mainController', ['$scope', '$window', function mainController($scope, $window) {
	
}]);
/**
* @name tasksController
* @description create task, read task, update task, delete task
* @param task object, id, name, task
*/
danApp.controller('tasksController', ['$scope', '$http', 'taskService', 'taskFactory', function tasksController($scope, $http, taskService, taskFactory) {

  $scope.tasks = [];

  $scope.getAllTasks = function() {
    taskService.readTasks()
      .then(function(tasks) {
         $scope.applyAllTasks(tasks);
      }, function(error) {
        alert('Read failed due to:' + error);
      });
  };

  $scope.applyAllTasks = function(tasks) {
    $scope.tasks = tasks;
  };

  $scope.getAllTasks();

  $scope.createTask = function(name, task) {
    // $scope.tasks.push({
    //   name: name,
    //   task: task
    // });
    taskService.createTask(name, task);
    $scope.name = '';
    $scope.task = '';
  };

  $scope.patchTask = function(id, name, task) {
    taskService.updateTask(id, name, task);
  };

  $scope.destroyTask = function(id, index) {
    $scope.tasks.splice(index, 1);
    taskService.deleteTask(id);
  };

  $scope.focusOnIt = function() {
    taskFactory.focusIt('focus');
  };

}]);
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
danApp.service('taskService', function($http, $route, $q) {

  return {
    readTasks: readTasks,
    createTask: createTask,
    updateTask: updateTask,
    deleteTask: deleteTask
  };

  /**
  * @name readTasks/handleSuccess
  * @description Get all names and tasks
  * @param response
  * @return request/response
  */
  function readTasks() {
    var request = $http({
      method: 'get',
      url: '/tasks',
      params: {
        action: 'get'
      }
    });
    return (request.then(handleSuccess));
  }

  function handleSuccess(response) {
    return (response.data);
  }


  /**
  * @name createTask
  * @description Create new names and tasks
  * @param name, task
  * @return createTask
  */
  function createTask(name, task) {
    var data = {};
    data.name = name;
    data.task = task;

    $http({
      method: 'post',
      url: '/tasks',
      data: data,
      params: {
        action: 'post'
      }
    }).then(function(data) {
      $route.reload();
    }, function(error) {
      alert('Create failed due to:' + error);
    });
    return createTask;
  }


  /**
  * @name updateTask
  * @description Update names and tasks
  * @param id, name, task
  * @return updateTask
  */
  function updateTask(id, name, task) {
    var data = {};
    data.id = id;
    data.name = name;
    data.task = task;

    $http({
      method: 'patch',
      url: '/tasks',
      data: data,
      params: {
        action: 'patch'
      }
    }).then(function(data) {
      $route.reload();
    }, function(error) {
      alert('Update failed due to:' + error);
    });
    return updateTask;
  }


  /**
  * @name deleteTask
  * @description Delete names and tasks
  * @param name, task
  * @return deleteTask
  */
  function deleteTask(id, name, task) {
    $http({
      method: 'delete',
      url: 'http://localhost:3000/tasks/?id=' + id,
      params: {
        action: 'delete'
      }
    }).then(function() {
      $route.reload();
    }, function(error) {
      alert('Delete failed due to:' + error);
    });
    return deleteTask;
  }

});
/**
* @name eventFocus
* @description after adding a task focus on create task input
* @param taskFactory
*/
// hey
danApp.directive('eventFocus', function(taskFactory) {
  return function(scope, elem, attr) {
    elem.on('click', function() {
      taskFactory.focusIt(attr.eventFocusId);
    });
    scope.$on('$destroy', function() {
      elem.off(attr.eventFocus);
    });
  };
});