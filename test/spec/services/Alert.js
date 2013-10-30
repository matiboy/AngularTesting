'use strict';

describe('Service: Alert', function () {
  // load the service's module
  beforeEach(module('AngularTestingApp'));

  // instantiate service
  var AlertService;
  beforeEach(inject(function (_AlertService_) {
    AlertService = _AlertService_;
  }));

  it('should do something', function () {
    expect(!!AlertService).toBe(true);
  });

});
