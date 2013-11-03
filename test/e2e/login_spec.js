var lodash = require('lodash');
var q = require('q');

describe('Login page', function() {
  beforeEach(function() {
    ptor = protractor.getInstance();
    ptor.get('#/login');
  });
  it('should show the correct title', function() {
    expect(ptor.findElement(protractor.By.binding('{{login.title}}')).getText()).toEqual('Login');
  });

  it('should contain a username input, whose value is empty', function() {
    expect(ptor.findElement(protractor.By.input('login.credentials.username')).getText()).toEqual('');
  });

  it('should contain a password input, whose value is empty', function() {
    expect(ptor.findElement(protractor.By.input('login.credentials.password')).getText()).toEqual('');
  });

  it('should contain a list of 3 rules', function() {
    ptor.findElements(protractor.By.repeater('rule in login.rules')).then(function(els) {
      expect(els.length).toEqual(3);
    });
  });

  it('should have Rule #2 as second entry', function() {
    var secondRule = ptor.findElement(protractor.By.repeater('rule in login.rules').row(1)).getText();
    // var secondRule = ptor.findElements(protractor.By.repeater('rule in login.rules').row(1)).getText(); // Watch out for findElement vs findElements
    expect(secondRule).toContain('Rule #2');
  });

  it('should have rules that are ordered alphabetically', function() {
    ptor.findElements(protractor.By.repeater('rule in login.rules')).then(function(els) {
      var promises = lodash.map(els, function(el) {
        return el.findElement(protractor.By.binding('rule')).getText();
      });
      q.all(promises).then(function(texts){
        expect(lodash.find(texts, function(text, k){
          return texts[k - 1] && (texts[k - 1] > texts[k]);
        })).toBeUndefined();
      });
    });
  });

  it('should list the rules below each other', function() {
    ptor.findElements(protractor.By.repeater('rule in login.rules')).then(function(els){
      var promises = lodash.map(els, function(el){
        return el.getLocation();
      });
      q.all(promises).then(function(positions){
        expect(lodash.find(positions, function(pos, k){
          return positions[k - 1] && (positions[k - 1].x !== positions[k].x);
        })).toBeUndefined();
      });
    });
  });

  // it('should list the rules next to each other', function() {
  //   ptor.findElements(protractor.By.repeater('rule in login.rules')).then(function(els){
  //     var promises = lodash.map(els, function(el){
  //       return el.getLocation();
  //     });
  //     q.all(promises).then(function(positions){
  //       expect(lodash.find(positions, function(pos, k){
  //         return positions[k - 1] && (positions[k - 1].y !== positions[k].y);
  //       })).toBeUndefined();
  //     });
  //   });
  // });

  describe('Login action', function() {
    describe('without credentials', function() {
      var ptor;
      beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('#/login');
        ptor.findElement(protractor.By.css("[ng-click^='login.validateAndLogin']")).click();
        ptor.waitForAngular();
      });
      it('should inform the user that there is a problem', function() {
        ptor.findElements(protractor.By.repeater('alert in alertCtrl.alerts')).then(function(alerts){
          expect(alerts.length).toEqual(1);
          expect(alerts[0].getAttribute('class')).toContain('alert-error');
        });
      });

      it('should not have redirected', function() {
        expect(ptor.getCurrentUrl()).toEqual(ptor.baseUrl + '/#/login');
      });
    });

    describe('with valid credentials', function() {
      beforeEach(function() {
        ptor = protractor.getInstance();
        ptor.get('#/login');
        ptor.findElement(protractor.By.input('login.credentials.username')).sendKeys(ptor.params.validLogin.username);
        ptor.findElement(protractor.By.input('login.credentials.password')).sendKeys(ptor.params.validLogin.password);
        ptor.findElement(protractor.By.css("[ng-click^='login.validateAndLogin']")).click();
      });
      it('should log user in', function() {
        expect(ptor.getCurrentUrl()).toEqual(ptor.baseUrl + '/#/');
      });

      it('should inform user via an alert', function() {
        ptor.findElements(protractor.By.repeater('alert in alertCtrl.alerts')).then(function(alerts){
          expect(alerts.length).toEqual(1);
          expect(alerts[0].getAttribute('class')).toContain('alert-success');
        });
      });

      it('should show on the main page that user is logged in', function() {
        expect(ptor.findElement(protractor.By.css('[ng-show=loggedIn]')).isDisplayed()).toBe(true);
      });

      it('should not show on the main page that user is not logged in (double negatives!)', function() {
        expect(ptor.findElement(protractor.By.css('[ng-hide=loggedIn]')).isDisplayed()).toBe(false);
      });
    });
    var ptor;
  });
});