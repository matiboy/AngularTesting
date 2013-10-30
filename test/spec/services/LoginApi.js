'use strict';

describe('Service: LoginApi', function () {

  // load the service's module
  beforeEach(module('AngularTestingApp'));

  // instantiate service
  var LoginApi;
  beforeEach(inject(function (_LoginApi_) {
    LoginApi = _LoginApi_;
  }));

  it('should do something', function () {
    expect(!!LoginApi).toBe(true);
  });

});
