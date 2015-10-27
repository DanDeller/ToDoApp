var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.config(function($routeProvider) {
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

scotchApp.controller('mainController', ['$scope', '$window', function($scope, $window) {
    $scope.message = 'home';
}]);

scotchApp.controller('tasksController', function($scope, $http) {
    $scope.message = 'tasks';

    var test = [];

    $http.get('/tasks')
        .success(function(data) {
            $scope.tasks = data;
            angular.forEach(data, function(value, key) {
                this.push(key + value)
            }, test);
            console.log(test);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // jquery lite to grab tasks will need to go here

});