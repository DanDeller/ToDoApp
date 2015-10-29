danApp.controller('tasksController', ['$scope', '$http', 'taskService', function tasksController($scope, $http, taskService) {
  $scope.message = 'tasks';

  $scope.allTasks; // doing things this way put the array inside of another array. be mindful of this

  getAllTasks()

  function applyAllTasks(tasks) {
    $scope.allTasks = tasks;
  }

  function getAllTasks() {
    taskService.getTasks()
      .then(function(tasks) {
         applyAllTasks(tasks);
      });
  }

}]);