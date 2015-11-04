/**
* @name getAllTask/applyAllTasks
* @description Get all tasks and store them
* @param task - task object
*/
danApp.controller('tasksController', ['$scope', '$http', 'taskService', function tasksController($scope, $http, taskService) {

  $scope.tasks;

  $scope.getAllTasks = function() {
    taskService.getTasks()
      .then(function(tasks) {
         $scope.applyAllTasks(tasks);
      });
  }

  $scope.applyAllTasks = function(tasks) {
    $scope.tasks = tasks;
  }

  $scope.getAllTasks();

}]);