var danApp = angular.module('danApp', ['ngRoute', 'ngAnimate']);

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