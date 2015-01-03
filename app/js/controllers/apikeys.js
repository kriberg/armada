(function () {
    'use strict';

    function APIKeyController($scope, $interval, Stationspinner) {
        $scope.apikeys = Stationspinner.APIKey.query();
        $scope.newKey = new Stationspinner.APIKey();

        $scope.deleteKey = function (key) {
            key.$delete();
            $scope.apikeys = Stationspinner.APIKey.query();
        };

        $scope.saveKey = function (key) {
            key.$save();
            if(!key.id) {
                $scope.newKey = new Stationspinner.APIKey();
            }
            $scope.apikeys = Stationspinner.APIKey.query();
        };

        $interval(function () {
            $scope.apikeys = Stationspinner.APIKey.query();
        }, 180000);

    }

    angular.
        module('apikeyControllers', []).
        controller('APIKeyController', ['$scope', '$interval', 'Stationspinner', APIKeyController]);
}());