module.exports = function () {
    'use strict';

    function AssetLocationsDetailsController($stateParams, $scope, $interval, $timeout, Stationspinner) {
        $scope.loadingLocationList = true;

        $scope.loadLocationsList = function () {
            $scope.loadingLocationList = true;
            var query_params = {
                characterIDs: $scope.$parent.characterSelection.join(','),
                locationIDs: $stateParams.locationIDs
            };
            return Stationspinner.AssetLocations.query(query_params).$promise.then(function (locations) {
                $scope.locations = locations;
                $scope.loadingLocationList = false;
                if(locations.length > 1) $scope.location = locations[0];
                if($stateParams.locationIDs.length == 8) {
                    switch($stateParams.locationIDs[0]) {
                        case '1':
                            $scope.region = true;
                            break;
                        case '3':
                            $scope.region = true;
                            $scope.solarSystem = true;
                            break;
                        default:
                            break;
                    }
                }
                if($scope.region || $scope.solarSystem) {
                    $scope.selectedLocation = locations[0];
                }
            });
        };
        $scope.loadLocationsList();

        $scope.loaderPromise = null;
        $scope.$watchCollection('$parent.characterSelection', function() {
            $timeout.cancel($scope.loaderPromise);
            $scope.loaderPromise = $timeout(function () {
                $scope.loadLocationsList();
            }, 1000);
        });

        $interval(function(){$scope.loadLocationsList();}, 21600000); //reload assets every six hours.
    }

    return angular.
        module('assetLocationsDetailsControllers', []).
        controller('AssetLocationsDetailsController', [
            '$stateParams',
            '$scope',
            '$interval',
            '$timeout',
            'Stationspinner',
            AssetLocationsDetailsController]);
};