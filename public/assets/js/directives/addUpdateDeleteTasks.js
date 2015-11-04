/**
* @name addTasks
* @description Add names and tasks
* @param scope, element, attributes
*/
danApp.directive('addTasks', function($http, $route) {
  return({
    link: addIt,
    restrict: 'A'
  });

  function addIt(scope, element, attributes) {
    element.on('click', function handleAddTask(event) {

      var data = {};

      data.name = $(this).prev().prev('.name').val();
      data.task = $(this).prev('.task').val();

      $http({
        method: 'post',
        url: '/tasks',
        data: data,
        params: {
          action: 'post'
        }
      });

      $route.reload();

    });
  }
});

/**
* @name updateTasks
* @description Update name and task
* @param scope, element, attributes
*/
danApp.directive('updateTasks', function($http, $route) {
  return({
    link: updateIt,
    restrict: 'A'
  });

  function updateIt(scope, element, attributes) {
    element.on('click', function handleTaskUpdate(event) {

      var task = $(this),
           id     = task.attr('data-id'),
           data = {};

      data.id = id;
      data.name = task.prev().prev('.task-name').val();
      data.task = task.prev('.task-job').val();

      $http({
         method: 'patch',
         url: '/tasks',
         data: data,
         params: {
           action: 'patch'
         }
      });

      $route.reload();

    });
  }
});

/**
* @name deleteTasks
* @description Delete specific tasks
* @param scope, element, attributes
*/
danApp.directive('deleteTasks', function($http, $route) {
  return({
    link: deleteIt,
    restrict: 'A'
  });

  function deleteIt(scope, element, attributes) {
    element.on('click', function handleTaskDelete(event) {

      var task = $(this),
            id    = task.attr('data-id');

      $http({
        method: 'delete',
        url: 'http://localhost:3000/tasks/?id=' + id
      });

      $route.reload();

    });
  }
});