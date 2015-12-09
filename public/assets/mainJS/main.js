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
  $scope.userImage = [];

  $scope.getImage = function() {
    taskService.getImage()
    .then(function(image) {
      $scope.useImage(image);
    }, function(error) {
      alert('Failed to get user image:' + error);
    });
  };

  $scope.useImage = function(image) {
    $scope.userImage = image;
    console.log($scope.userImage);
  }

  $scope.getImage();

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
* @name eventFocus
* @description after adding a task focus on create task input
* @param taskFactory
*/
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

danApp.directive('fileDropzone', function(taskService) {
	return {
		restrict: 'A',
		scope: {
			file: '=',
			fileName: '='
		},
		link: function(scope, element, attrs) {
			var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
			processDragOverOrEnter = function(event) {
				if (event != null) {
					event.preventDefault();
				}
				event.dataTransfer.effectAllowed = 'copy';
				return false;
			};
			validMimeTypes = attrs.fileDropzone;
			checkSize = function(size) {
				var _ref;
				if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
					return true;
				} else {
					alert("File must be smaller than " + attrs.maxFileSize + " MB");
					return false;
				}
			};
			isTypeValid = function(type) {
				if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
					return true;
				} else {
					alert("Invalid file type.  File must be one of following types " + validMimeTypes);
					return false;
				}
			};
			element.bind('dragover', processDragOverOrEnter);
			element.bind('dragenter', processDragOverOrEnter);
			return element.bind('drop', function(event) {
				taskService.userImage(element);
				var file, name, reader, size, type;
				if (event != null) {
					event.preventDefault();
				}
				reader = new FileReader();
				reader.onload = function(evt) {
					if (checkSize(size) && isTypeValid(type)) {
						return scope.$apply(function() {
							scope.file = evt.target.result;
							if (angular.isString(scope.fileName)) {
								return scope.fileName = name;
							}
						});
					}
				};
				file = event.dataTransfer.files[0];
				name = file.name;
				type = file.type;
				size = file.size;
				reader.readAsDataURL(file);
				return false;
			});
		}
	};
});

danApp.directive('deleteImage', function(taskService) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('mouseenter', function() {
				console.log('hovered')
			});
		}
	}
});
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
    deleteTask: deleteTask,
    userImage: userImage,
    getImage: getImage
  };

  function getImage() {
    var request = $http({
      method: 'get',
      url: '/userImage',
      params: {
        action: 'get'
      }
    });
    return (request.then(handleImage));
  }

  function handleImage(response) {
    return (response.data);
  }

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
  * @name userImage
  * @description Upload user image
  * @param image
  * @return userImage
  */
  function userImage(image) {
    var data = {};
    data.image = image;

    $http({
      method: 'post',
      url: '/userImage',
      data: data,
      params: {
        action: 'post'
      }
    }).then(function(data) {
    }, function(error) {
      alert('Create failed due to:' + error);
    });
    return userImage;
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