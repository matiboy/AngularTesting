'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('AngularTestingApp'));

  var LoginCtrl,
    scope;
  var AlertService; 
  var Login;
  var LoginApiStatus;
  var $q;
  var $location;
  var jasmineNG = {};
  //set $q in your test
  jasmineNG.$q = null;
  //Could make similar to test a failing promise
  jasmineNG.createPromiseReturningSpy = function() {
    var deferred = jasmineNG.$q.defer();
    var spy = jasmine.createSpy().andReturn(deferred.promise);
    spy.andResolveWith = function(val) {
      deferred.resolve(val);
      return spy; // chain
    };
    spy.andRejectWith = function(val) {
      deferred.reject(val);
      return spy;
    };
    return spy;
  }

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _LoginApiStatus_, _$q_, _$location_) {
    // Create spy objects
    AlertService = jasmine.createSpyObj('AlertService', ['clear', 'add']);
    Login = jasmine.createSpyObj('Login', ['validate', 'login']);
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      AlertService: AlertService,
      Login: Login // Override default services
    });
    LoginApiStatus = _LoginApiStatus_; // Keep this one, just constants
    $q = _$q_;
    jasmineNG.$q = $q;
    $location = _$location_;
  }));

  it('should have a validateAndLogin function', function () {
    expect(LoginCtrl.validateAndLogin).toBeDefined();
  });

  // Previous example crosses the boundaries to the service (relies on it working)
  // Instead, let's check that - according to known business logic - the correct functions have been called
  it('should call clear, always', function () {
    LoginCtrl.validateAndLogin();
    expect(AlertService.clear).toHaveBeenCalled();
  });

  it('should call validate but not login if validation failed', function () {
    // Make sure validate fails
    Login.validate.andReturn(false);

    LoginCtrl.validateAndLogin();
    expect(Login.validate).toHaveBeenCalled();
    expect(Login.login).not.toHaveBeenCalled();
  });

  it('should call login if validation succeeded', function () {
    // Make sure validate passes
    Login.validate.andReturn(true);

    // Ensure we receive a promise
    Login.login = jasmineNG.createPromiseReturningSpy();
    
    LoginCtrl.validateAndLogin();
    expect(Login.validate).toHaveBeenCalled();
    expect(Login.login).toHaveBeenCalled();
  });

  it('should add an error message if no connection', function () {
    // Make sure validate passes
    Login.validate.andReturn(true);
    // Ensure we receive a promise
    Login.login = jasmineNG.createPromiseReturningSpy().andResolveWith({
      status: LoginApiStatus.WRONG_URL
    });
    
    LoginCtrl.validateAndLogin();
    // Resolve
    scope.$apply();
    expect(AlertService.add.mostRecentCall.args[0]).toEqual('error');
  });

  it('should add a warning message if invalid creds', function () {
    // Make sure validate passes
    Login.validate.andReturn(true);

    // Ensure we receive a promise
    Login.login = jasmineNG.createPromiseReturningSpy().andResolveWith({
      status: LoginApiStatus.INVALID_CREDENTIALS
    });
    
    LoginCtrl.validateAndLogin();
    // Resolve
    scope.$apply();
    expect(AlertService.add.mostRecentCall.args[0]).toEqual('warning');
  });

  it('should redirect to / when successful', function () {
    // Make sure validate passes
    Login.validate.andReturn(true);

    Login.login = jasmineNG.createPromiseReturningSpy().andResolveWith({
      status: LoginApiStatus.OK
    });

    // Spy on location service
    spyOn($location, 'path');
    
    LoginCtrl.validateAndLogin();
    // Resolve
    scope.$apply();
    expect($location.path).toHaveBeenCalledWith('/');
  });  
});
