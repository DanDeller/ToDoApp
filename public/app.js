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

danApp.controller('mainController', ['$scope', '$window', function($scope, $window) {
  $scope.message = 'home';
}]);

danApp.controller('tasksController', function($scope, $http) {
  $scope.message = 'tasks';

  var tasks = [];

  // KEEP THIS. WORK THE JQUERY CODE INTO A DIRECTIVE
  $http.get('/tasks')
  .success(function(data) {
    $scope.tasks = data;
    angular.forEach(data, function(value, key) {
      this.push(value);
    }, tasks);
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

   //   var form = $('.form2'),
   //        tasks;

   //  // display all tasks
   //  function displayTasks(tasks) {
   //    var taskList = $('.task-list');
   //    $.each(tasks, function(i) {
   //      taskList.append(
   //        '<li class="single-todo">' +
   //        '<input class="test1" type="hidden" name="id" value= "' + tasks[i].id + '" />' +
   //        '<input class="test2" type="text" name="name" value="' + tasks[i].name + '" />' +
   //        '<input class="test3" type="text" name="task" value="' + tasks[i].task + '" />' +
   //        '<button data-id="' + tasks[i].id + '" class="update">Update</button>' +
   //        '<button data-id="' + tasks[i].id + '" class="destroy">Delete</button>' +
   //        '</li>'
   //        );
   //    });
   //  }

   //  // get all tasks
   //  function getTasks(ajaxData) {
   //    $.ajax({
   //      url: 'http://localhost:3000/tasks',
   //      success: function(data) {
   //        tasks = data;
   //        ajaxData(data);
   //      }
   //    }).done(function() {
   //      displayTasks(tasks);
   //    });
   //  }

   //  // use ajax data outside of getTask(ajaxData)
   //  getTasks(function(output) {
   //    // console.log(output)
   //  });

   //  // get id
   //  $(document).on('click','.single-todo',function() {
   //   var todo = $(this),
   //        id     = todo.find('button').attr('data-id');
   //   form.find('[type="hidden"]').val(id);
   // });

   //  // delete tasks
   //  $(document).on('click', '.destroy[data-id]', function() {
   //    var self = $(this),
   //    id    = self.attr('data-id');
   //    $(this).parent().fadeOut(500, function() {
   //      $.ajax({
   //        url: 'http://localhost:3000/tasks/?id=' + id,
   //        type: 'DELETE',
   //        success: function(data) {
   //         console.log('task deleted');
   //       }
   //     });
   //    });
   //  });

   //  // new way to update tasks
   //  $(document).on('click', '.update', function() {
   //    var todo = $(this),
   //    id     = todo.attr('data-id');
   //    var data = {};
   //    data.id = id;
   //    data.name = $(this).prev().prev('.test2').val();
   //    data.task = $(this).prev('.test3').val();
   //    $.ajax({
   //      url: 'http://localhost:3000/tasks',
   //      type: 'PATCH',
   //      data: data,
   //      success: function(data) {
   //        location.reload(true);
   //      }
   //    });
   //  });

});


// directive up update our task list
danApp.directive('updateTasks', function() {
    return({
        link: updateIt,
        restrict: "A"
    });
    function updateIt(scope, element, attributes) {
        element.on('click', function handleTaskUpdate(event) {

            var task = $(this),
                 id     = task.attr('data-id'),
                 data = {};

            data.id = id;
            data.name = $(this).prev().prev('.task-name').val();
            data.task = $(this).prev('.task').val();

            $.ajax({
                url: 'http://localhost:3000/tasks',
                type: 'PATCH',
                data: data,
                success: function(data) {
                    location.reload(true);
                }
            });
        });
    }
});