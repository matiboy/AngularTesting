'use strict';

angular.module('AngularTestingApp.Alerts', [])
  .controller('AlertCtrl', function ($scope, AlertService) {
    this.alerts = AlertService.alerts;
    this.closeAlert = function(i) {
      AlertService.removeByIndex(i);
      // 'this' is the scope here
      // AlertService.remove(this.alert);
    }
  });
