module.exports = function () {
    'use strict';

    function AssetsLocationsListController($scope, $interval, $timeout, $filter, Stationspinner, CharacterSelector, AssetToolbar) {
        $scope.regions = [];
        $scope.solarSystems = [];
        $scope.filteredLocations = [];
        $scope.AssetToolbar = AssetToolbar;
        AssetToolbar.placeholderText = 'system name...';
        $scope.loadingAssetlocations = false;

        $scope.search = function(searchText) {
            AssetToolbar.searchActive = true;
            console.log('Searching', searchText);
            $scope.filteredLocations.length = 0;
            $scope.filteredLocations = $filter('filter')($scope.solarSystems, {name: searchText});
            console.log($scope.filteredLocations);
            AssetToolbar.searchActive = false;
        };
        $scope.clear = function () {
            console.log('Clearing');
            $scope.filteredLocations.length = 0;
            AssetToolbar.searchText = '';
        };
        AssetToolbar.setSearchCallback($scope.search);
        AssetToolbar.setClearCallback($scope.clear);

        $scope.loadAssetLocations = function () {
            if($scope.loadingAssetlocations || !CharacterSelector.charactersHasLoaded) return;
            console.log('loadAssetLocations', $scope.loadingAssetlocations, !CharacterSelector.charactersHasLoaded);
            $scope.loadingAssetlocations = true;
            $scope.regions.length = 0;
            $scope.solarSystems.length = 0;
            Stationspinner.AssetLocations.query({
                characterIDs: CharacterSelector.join_characterIDs()
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

        $scope.loaderTimer = null;
        $scope.$watchCollection('CharacterSelector.characterSelection', function () {
            if(!CharacterSelector.charactersHasLoaded) return;
            console.log('CharacterSelector.characterSelection updated');
            $timeout.cancel($scope.loaderTimer);
            $scope.loaderTimer = $timeout(function () {
                $scope.loadAssetLocations();
                if($scope.filteredLocations.length > 0) {
                    $scope.search(AssetToolbar.searchText, AssetToolbar.searchActive);
                }
            }, 1000);
        });

        $interval(function () {
            $scope.loadAssetLocations();
        }, 21600000); //reload assets every six hours.
    }

    return angular
        .module('assetsLocationsListControllers', [])
        .controller('AssetsLocationsListController', [
            '$scope',
            '$interval',
            '$timeout',
            '$filter',
            'Stationspinner',
            'CharacterSelector',
            'AssetToolbar',
            AssetsLocationsListController]);
};