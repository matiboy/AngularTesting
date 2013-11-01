'use strict';

angular.module('AngularTestingApp')
  .controller('LoginCtrl', function ($scope, AlertService, Login, LoginApiStatus, $location) {
    this.credentials = {
      username: '',
      password: ''
    };
    this.title = 'Login';
    this.rules = [
      'Rule #1: You do not talk about Fight Club',
      'Rule #2: You *do not* talk about Fight Club',
      'Rule #3: Only 2 guys to a fight'
    ];
    this.validateAndLogin = angular.bind(this, function() {
      // Clear the alerts
      AlertService.clear();
      // Check username and password are filled up
      if(!Login.validate(this.credentials.username, this.credentials.password)) {
        AlertService.add('error', 'Please fill up both login and password');
      } else {
        Login.login(this.credentials.username, this.credentials.password).then(function(data) {
        // Login.distantLogin(this.credentials.username, this.credentials.password).then(function(data) {
          if(data.status === LoginApiStatus.OK) {
            AlertService.add('success', 'You have been logged in');
            $location.path('/');
          } else if(data.status === LoginApiStatus.WRONG_URL){
            AlertService.add('error', 'Unable to connect to server');
          } else if(data.status === LoginApiStatus.INVALID_CREDENTIALS) {
            AlertService.add('warning', 'Invalid credentials');
          }
        });
      }
    });
  });
