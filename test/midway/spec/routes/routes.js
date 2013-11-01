//
// test/midway/routesSpec.js
//
describe("Testing Routes", function() {

  var tester;
  var expect = chai.expect;

  before(function(done) {
    tester = ngMidwayTester('AngularTestingApp', true);
    tester.inject('$route');
    done();
  });

  it("should have a login route", function() {
    tester.visit('/login');
    var url = tester.path();
    expect(url).to.equal('/login'); // Chai style
  });

  it("should redirect to / on non existing urls", function() {
    tester.visit('/somerandom');
    var url = tester.path();
    expect(url).to.equal('/');
  });
});