'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('AngularTestingApp'));

  var LoginCtrl,
    scope;
  var AlertService; 

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AlertService_) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
    AlertService = _AlertService_;
  }));

  it('should have a validateAndLogin function', function () {
    expect(LoginCtrl.validateAndLogin).toBeDefined();
  });
  describe('with local login', function() {
    it('should have a show an error message when username is empty', function () {
      LoginCtrl.credentials = {
        username: '',
        password: 'fdsfds'
      };
      LoginCtrl.validateAndLogin();
      expect(AlertService.alerts.length).toEqual(1);
      expect(AlertService.alerts[0].type).toEqual('error');
    });

    it('should have a show an error message when password is empty', function () {
      LoginCtrl.credentials = {
        username: 'fdsfds',
        password: ''
      };
      LoginCtrl.validateAndLogin();
      expect(AlertService.alerts.length).toEqual(1);
      expect(AlertService.alerts[0].type).toEqual('error');
    });
    
    it('should still have only one error message after several failures', function () {
      LoginCtrl.credentials = {
        username: 'fdsfds',
        password: ''
      };
      LoginCtrl.validateAndLogin();
      LoginCtrl.credentials = {
        username: '',
        password: 'gfjgdflgjd'
      };
      LoginCtrl.validateAndLogin();
      expect(AlertService.alerts.length).toEqual(1);
      expect(AlertService.alerts[0].type).toEqual('error');
    });
  });
});
