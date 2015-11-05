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

  $scope.task = {
    id: '',
    name: '',
    task: ''
  };

  $scope.createTask = function() {
    taskService.createTask($scope.task.name, $scope.task.task);
  }

 $scope.patchTask = function() {
  console.log($scope.task)
  taskService.updateTask($scope.task.id, $scope.task.name, $scope.task.task);
}

}]);