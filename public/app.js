var scotchApp = angular.module('scotchApp', ['ngRoute']);

scotchApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {
        templateUrl : 'views/login.html',
        controller  : 'mainController'
    })
    .when('/todo', {
        templateUrl : 'views/todo.html',
        controller  : 'todoController'
    });
});

scotchApp.controller('mainController', function($scope) {
    $scope.message = 'home';
});

scotchApp.controller('todoController', function($scope) {
    $scope.message = 'todo';
});