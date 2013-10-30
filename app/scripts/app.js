'use strict';

angular.module('AngularTestingApp', [
    'AngularTestingApp.Alerts',
    'ui.bootstrap',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl as login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
