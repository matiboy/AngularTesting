'use strict';

angular.module('AngularTestingApp')
  .controller('LoginCtrl', function ($scope, AlertService) {
    this.credentials = {
      username: '',
      password: ''
    };
    this.validateAndLogin = function() {
      AlertService.add('error', 'Oh snap! Change a few things up and try submitting again.');
    }
  });
