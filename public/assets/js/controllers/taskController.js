danApp.controller('tasksController', ['$scope', '$http', 'taskService', function tasksController($scope, $http, taskService) {

  /**
  * @name applyAllTasks/getAllTask
  * @description Get all tasks and store them
  * @param task - task object
  */

  $scope.tasks;

  $scope.applyAllTasks = function(tasks) {
    $scope.tasks = tasks;
  }

  $scope.getAllTasks = function() {
    taskService.getTasks()
      .then(function(tasks) {
         $scope.applyAllTasks(tasks);
      });
  }

  $scope.getAllTasks();

}]);