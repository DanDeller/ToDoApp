var danApp = angular.module('danApp', ['ngRoute']);

danApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl : 'views/login.html',
    controller  : 'mainController'
  })
  .when('/tasks', {
    templateUrl : 'views/todo.html',
    controller  : 'tasksController'
  });
});




// directive up update our task list - to use put update-task inside of tag
// danApp.directive('updateTasks', function() {
//     return({
//         link: updateIt,
//         restrict: "A"
//     });
    // function updateIt(scope, element, attributes) {
    //     element.on('click', function handleTaskUpdate(event) {

    //         var task = $(this),
    //              id     = task.attr('data-id'),
    //              data = {};

    //         data.id = id;
    //         data.name = $(this).prev().prev('.task-name').val();
    //         data.task = $(this).prev('.task').val();

    //         $.ajax({
    //             url: 'http://localhost:3000/tasks',
    //             type: 'PATCH',
    //             data: data,
    //             success: function(data) {
    //                 location.reload(true);
    //             }
    //         });
    //     });
    // }
// });