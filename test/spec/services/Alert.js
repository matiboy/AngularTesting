'use strict';

xdescribe('Service: Alert', function () {
  // load the service's module
  beforeEach(module('AngularTestingApp'));

  // instantiate service
  var AlertService;
  // beforeEach(inject(function ($injector) {
  //   AlertService = $injector.get('AlertService');
  // }));

  beforeEach(inject(function (_AlertService_) {
    AlertService = _AlertService_;
  }));

  it('should exist', function () {
    expect(!!AlertService).toBe(true);
  });

  it('should add an alert when add is called', function () {
    var n = AlertService.alerts.length;
    AlertService.add('error', 'marriage');
    expect(AlertService.alerts.length).toEqual(n+1);
  });

  it('should have the correct alert as the last entry', function () {
    var n = AlertService.alerts.length;
    AlertService.add('error', 'jquery');
    var last = AlertService.alerts[n];
    expect(last.type).toEqual('error');
    expect(last.message).toEqual('jquery');
  });

  it('should have one less alert when removed', function() {
    AlertService.add('error', 'jquery');
    AlertService.add('warning', 'someunique warning');
    AlertService.add('warning', 'another warning');
    var n = AlertService.alerts.length;
    var sepc = AlertService.alerts[1]; // Pick one
    AlertService.remove(sepc);
    expect(AlertService.alerts.length).toEqual(n-1);
  });

  it('should remove a particular alert when asked', function() {
    var n = AlertService.alerts.length;
    AlertService.add('error', 'jquery');
    AlertService.add('warning', 'someunique warning');
    AlertService.add('warning', 'another warning');
    var sepc = AlertService.alerts[n+1]; // this will give us the second one added
    AlertService.remove(sepc);
    expect(_.find(AlertService.alerts, sepc)).toBeUndefined();
  });

  it('should clear all entries when clear is called', function() {
    AlertService.add('error', 'jquery');
    AlertService.add('warning', 'someunique warning');
    AlertService.add('warning', 'another warning');
    AlertService.clear();
    expect(AlertService.alerts.length).toEqual(0);
  });
});
