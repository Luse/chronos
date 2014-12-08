'use strict';

/**
 * @ngdoc function
 * @name arbetsprovApp.controller:ClockCtrl
 * @description
 * # MainCtrl + directive
 * Controller of the arbetsprovApp
 */
angular.module('arbetsprovApp')
  .filter('zonefilter', function() {

  })
  .controller('ClockCtrl', function ($scope, $timeout) {
    $scope.localClock = 'loading clock...'; //var init for local time
    $scope.remoteClock = 'loading clock...'; //var init remote time

    $scope.tickInterval = 1000;  //interval (ms) for tick function

    $scope.zonedata = {}; //init object so we have something to push relavant timezone data into
    $scope.allZones = moment.tz.names(); //push array with all timezones into var we can use

    $scope.zonedata.okSearch ={}; //object we only store "correkt" timezone inputs, this avoids a major error(you dont want to update momemt() to frequently) and saves resourses.
    //this lets us use .containts on allZones, keypart of filtering correkt user inputs
    Array.prototype.contains = function(obj) {
      var i = this.length;
      while (i--) {
        if (this[i] === obj) {
          return true;
        }
      }
      return false;
    };
    $scope.zonedata.timezoneSearch = 'Asia/Tokyo'; //var we use for the userinterface, string is the searchbars standardvalue



    //we need to keep the clock ticking after we fetch the data, this function takes care of that.
    var tick = function () {

      //this is the final piece of the user input validation, it only passes valid inputs to the timezone library
      if($scope.allZones.contains($scope.zonedata.timezoneSearch)){
        $scope.zonedata.okSearch = $scope.zonedata.timezoneSearch;
      }
      $scope.localClock = moment().format('HH:mm:ss'); // get the current local time
      $scope.remoteClock = moment().tz($scope.zonedata.okSearch).format('HH:mm:ss'); //get validated user input
      $timeout(tick, $scope.tickInterval); // reset the timer

    };
    //start the tick function
    $timeout(tick, $scope.tickInterval);

    //custom directive so we can use the "autocomplete" tag in main.html (uses jquery.ui)
  }).directive('autoComplete', function($timeout) {
    return function(scope, iElement) {
      iElement.autocomplete({
        source: scope.allZones,
        select: function() {
          $timeout(function() {
            iElement.trigger('input');
          }, 0);
        }
      });
    };
  });


