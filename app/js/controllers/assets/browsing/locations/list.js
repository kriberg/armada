module.exports = function () {
    'use strict';

    function AssetLocationsListController($scope, $interval, $timeout, Stationspinner) {
        $scope.regions = [];
        $scope.solarSystems = [];
        $scope.loadingAssetlocations = true;

        $scope.loadAssetLocations = function () {
            $scope.loadingAssetlocations = true;
            $scope.regions.length = 0;
            $scope.solarSystems.length = 0;
            Stationspinner.AssetLocations.query({
                characterIDs: $scope.$parent.characterSelection.join(',')
            }).$promise.then(function (locations) {
                var newRegions = {}, newSolarSystems = {};
                angular.forEach(locations, function (location) {
                    if (!newRegions.hasOwnProperty(location.regionName)) {
                        newRegions[location.regionName] = {
                            name: location.regionName,
                            locationID: location.regionID,
                            value: 0.0,
                            volume: 0.0
                        };
                    }
                    if (!newSolarSystems.hasOwnProperty(location.solarSystemName)) {
                        newSolarSystems[location.solarSystemName] = {
                            name: location.solarSystemName,
                            locationID: location.solarSystemID,
                            region: location.regionName,
                            value: 0.0,
                            volume: 0.0
                        };
                    }
                    newRegions[location.regionName].value += location.value;
                    newSolarSystems[location.solarSystemName].value += location.value;
                    newRegions[location.regionName].volume += location.volume;
                    newSolarSystems[location.solarSystemName].volume += location.volume;
                });
                angular.forEach(newRegions, function (region) {
                    $scope.regions.push(region);
                });
                angular.forEach(newSolarSystems, function (solarSystem) {
                    $scope.solarSystems.push(solarSystem);
                });
                $scope.loadingAssetlocations = false;
            });
        };
        $scope.loadAssetLocations();

        $scope.loaderPromise = null;
        $scope.$watchCollection('characterSelection', function () {
            $timeout.cancel($scope.loaderPromise);
            $scope.loaderPromise = $timeout(function () {
                $scope.loadAssetLocations();
            }, 1000);
        });

        $interval(function () {
            $scope.loadAssetLocations();
        }, 21600000); //reload assets every six hours.
    }

    return angular
        .module('assetLocationsListControllers', [])
        .controller('AssetLocationsListController', [
            '$scope',
            '$interval',
            '$timeout',
            'Stationspinner',
            AssetLocationsListController]);
};