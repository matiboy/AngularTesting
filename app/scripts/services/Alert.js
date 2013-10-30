'use strict';

angular.module('AngularTestingApp')
  .factory('AlertService', function AlertService() {
    var alerts = [];
    return {
      alerts: alerts,
      add: function(type, message) {
        alerts.push({
          type: type,
          message: message
        });
      },
      clear: function() {
        _.remove(alerts, function() {return true});
      },
      remove: function(alert) {
        _.remove(alerts, function(item) {
          return item === alert;
        })
      }
    }
  });
