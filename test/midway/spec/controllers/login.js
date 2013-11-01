//
// test/midway/routesSpec.js
//
describe("Testing login functionality", function() {

  var tester;
  var expect = chai.expect;
  var LoginCtrl;
  var AlertService;
  var AlertCtrl;

  before(function(done) {
    tester = ngMidwayTester('AngularTestingApp', true);
    var $controller = tester.inject('$controller');
    var $rootScope = tester.inject('$rootScope');
    LoginCtrl = $controller('LoginCtrl', {
      $scope: $rootScope.$new()
    });
    AlertService = tester.inject('AlertService');

    AlertCtrl = $controller('AlertCtrl', {
      $scope: $rootScope.$new()
    });
    done();
  });

  it("should put an alert into AlertCtrl when credentials are empty", function() {
    LoginCtrl.validateAndLogin();
    expect(AlertCtrl.alerts).to.have.length(1);
  });

  it("should put exactly one alert, even when several failed tries", function() {
    LoginCtrl.validateAndLogin();
    LoginCtrl.validateAndLogin();
    expect(AlertCtrl.alerts).to.have.length(1);
  });
});