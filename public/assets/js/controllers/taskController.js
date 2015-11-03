danApp.controller('tasksController', ['$scope', '$http', 'taskService', function tasksController($scope, $http, taskService) {

  $scope.tasks;

  /**
  * @name applyAllTasks/getAllTask
  * @description Get all tasks and store
  * @param task task object
  */

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

  /**
  * @name updateTask
  * @description Update name and task
  * @param id id of current task
  */

  $scope.updateTask = function(id) {
  
    var data = {};
    data.id = id;
    data.name = $('.task-name').val();
    data.task = $('.task-task').val();

    var test = $http({
      method: 'patch',
      url: '/tasks',
      data: data,
      params: {
        action: 'patch'
      }
    });

    // taskService.updateTask()
    //   .then(function(tasks) {
    //     console.log(tasks);
    //   });
  }

}]);