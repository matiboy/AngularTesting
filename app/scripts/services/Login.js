'use strict';

angular.module('AngularTestingApp')
  .factory('Login', function (LoginApi, LoginApiStatus) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      validate: function (username, password) {
        return (username.length && password.length);
      },
      login: function(username, password) {
        return LoginApi.login(username, password).then(function(res) {
          return res.data;
        }, function(res) {
          return {
            status: LoginApiStatus.WRONG_URL
          }
        });
      },
      distantLogin: function(username, password) {
        return LoginApi.distantLogin(username, password).then(function(res) {
          return res.data;
        }, function(res) {
          return {
            status: LoginApiStatus.WRONG_URL
          }
        });
      }
    };
  });
