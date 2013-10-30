'use strict';

describe('Controller: AlertCtrl', function () {

  // load the controller's module
  beforeEach(module('AngularTestingApp'));

  var AlertCtrl,
    scope;
  var AlertService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _AlertService_) {
    scope = $rootScope.$new();
    AlertCtrl = $controller('AlertCtrl', {
      $scope: scope
    });
    AlertService = _AlertService_;
  }));

  it('should contain an empty list of alerts', function () {
    expect(AlertCtrl.alerts).toBeDefined();
  });

  it('should have a closeAlert function', function () {
    expect(AlertCtrl.closeAlert).toBeDefined();
  });

  describe('removing alert', function() {
    it('should remove the alert', function () {
      // Add a few alerts
      AlertService.add('error', 'hello');
      AlertService.add('warning', 'keep calm');
      AlertCtrl.closeAlert(1);
      expect(AlertCtrl.alerts.length).toEqual(1);
    });    
  });
});
