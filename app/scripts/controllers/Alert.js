'use strict';

angular.module('AngularTestingApp.Alerts', [])
  .controller('AlertCtrl', function ($scope, AlertService) {
    this.alerts = AlertService.alerts;
    $scope.closeAlert = function() {
      // this is the scope here
      AlertService.remove(this.alert);
    }
  });
