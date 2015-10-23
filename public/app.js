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

scotchApp.controller('tasksController', function($scope) {
    $scope.message = 'tasks';

    // jquery lite to grab tasks will need to go here

});