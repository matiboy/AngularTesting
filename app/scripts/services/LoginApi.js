'use strict';

angular.module('AngularTestingApp')
  .factory('LoginApi', function ($q, $http, LoginApiStatus) {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      login: function (username, password) {
        var q = $q.defer();
        var status = LoginApiStatus.INVALID_CREDENTIALS;
        var sid = '';
        if(username === 'mat' && password === 'iboy') {
          status = LoginApiStatus.OK;
          sid = 'abcdefgh';
        }
        q.resolve({
          status: 200,
          data: {
            status: status,
            sid: sid
          }
        });
        return q.promise;
      },
      distantLogin: function(username, password) {
        return $http.post('http://randomurl.com', {
          username: username,
          password: password
        });
      }
    };
  }).value('LoginApiStatus', {
    WRONG_URL: 2,
    OK: 0,
    INVALID_CREDENTIALS: 1
  });
