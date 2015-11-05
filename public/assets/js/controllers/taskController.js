/**
* @name getAllTask/applyAllTasks
* @description Get all tasks and store them
* @param task - task object
*/
danApp.controller('tasksController', ['$scope', '$http', 'taskService', function tasksController($scope, $http, taskService) {

  $scope.tasks;

  $scope.getAllTasks = function() {
    taskService.readTasks()
      .then(function(tasks) {
         $scope.applyAllTasks(tasks);
      });
  }

  $scope.applyAllTasks = function(tasks) {
    $scope.tasks = tasks;
  }

  $scope.getAllTasks();

  $scope.createTask = function(name, task) {
    taskService.createTask(name, task);
  }

  $scope.patchTask = function(id, name, task) {
    taskService.updateTask(id, name, task);
  }

  $scope.destroyTask = function(id) {
    taskService.deleteTask(id);
  }

}]);