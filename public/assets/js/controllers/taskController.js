/**
* @name tasksController
* @description create task, read task, update task, delete task
* @param task object, id, name, task
*/
danApp.controller('tasksController', ['$scope', '$http', 'taskService', 'taskFactory', function tasksController($scope, $http, taskService, taskFactory) {

  $scope.tasks = [];

  $scope.getImage = function() {
    taskService.getImage()
    .then(function(image) {
      $scope.useImage(image);
    }, function(error) {
      alert('Failed to get user image:' + error);
    });
  };

  $scope.useImage = function(image) {
    console.log(image);
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