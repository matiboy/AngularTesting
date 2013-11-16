'use strict';

describe('Service: LoginApi', function () {

  // load the service's module
  beforeEach(module('AngularTestingApp'));

  // instantiate service
  var LoginApi;
  var $httpBackend;
  var LoginApiStatus;
  var $exceptionHandler;
  beforeEach(inject(function (_LoginApi_, _$httpBackend_, _LoginApiStatus_) {
    LoginApi = _LoginApi_;
    $httpBackend = _$httpBackend_;
    LoginApiStatus = _LoginApiStatus_;
  }));

  it('should be there', function () {
    expect(!!LoginApi).toBe(true);
  });

  it('should return an object with a then function', function() {
    expect(LoginApi.distantLogin({}).then).toBeDefined();
  });

  it('should have an invalid credentials if an invalid user is passed', function() {
    var outStatus;
    var credentials = {
      username: 'mati',
      password: 'boy'
    };
    // Define $hhtpBackend behaviour
    $httpBackend.whenPOST('http://randomurl.com/' + credentials.username, credentials).respond(404, {
      status: LoginApiStatus.WRONG_URL
    });
    LoginApi.distantLogin(credentials).then(function(e) {
      expect(e.status).toEqual(LoginApiStatus.WRONG_URL);
    }, function(e) {
      outStatus = e.status;
    });
    $httpBackend.flush();
  });


  it('should resolve the promise if a valid user is passed', function() {
    var outStatus;
    var credentials = {
      username: 'mati',
      password: 'boy'
    };
    // Define $hhtpBackend behaviour
    $httpBackend.whenPOST('http://randomurl.com/' + credentials.username, credentials).respond(200, {
      
    });
    LoginApi.distantLogin(credentials).then(function(e) {
      expect(e.status).toEqual(LoginApiStatus.OK);
    }, function(e) {
      outStatus = e.status;
    });
    $httpBackend.flush();
  });

});
