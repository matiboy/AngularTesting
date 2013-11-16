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
      distantLogin: function(creds) {
        return $http.post('http://randomurl.com/'+creds.username, creds).then(function(res) {
          return {
            status: LoginApiStatus.OK,
            message: 'Yup, we re here'
          };
        }, function(){
          return {
            status: LoginApiStatus.WRONG_URL
          };
          // throw new Error({
          //   status: LoginApiStatus.WRONG_URL
          // });
        });
      }
    };
  }).value('LoginApiStatus', {
    WRONG_URL: 2,
    OK: 0,
    INVALID_CREDENTIALS: 1
  });
