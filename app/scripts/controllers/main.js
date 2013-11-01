'use strict';

angular.module('AngularTestingApp')
  .controller('MainCtrl', function ($scope, Login) {
    $scope.loggedIn = Login.token();
  });
