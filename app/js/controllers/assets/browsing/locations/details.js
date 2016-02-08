module.exports = function () {
    'use strict';

    function AssetsLocationsDetailsController($stateParams, $scope, $interval, $timeout, Stationspinner,
                                             CharacterSelector, AssetToolbar) {
        $scope.loadingLocationList = false;
        $scope.AssetToolbar = AssetToolbar;

        $scope.loadLocationsList = function () {
            if($scope.loadingLocationList || !CharacterSelector.charactersHasLoaded) return;
            console.log('loadLocationsList', $scope.loadingLocationList, !CharacterSelector.charactersHasLoaded);
            $scope.loadingLocationList = true;
            var query_params = {
                characterIDs: CharacterSelector.join_characterIDs(),
                locationIDs: $stateParams.locationIDs
            };
            return Stationspinner.AssetLocations.query(query_params).$promise.then(function (locations) {
                $scope.locations = locations;
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
                $scope.loadingLocationList = false;
            });
        };

        $scope.loaderTimer = null;
        $scope.$watchCollection('CharacterSelector.characterSelection', function() {
            if(!CharacterSelector.charactersHasLoaded) return;
            console.log('CharacterSelector.characterSelection updated');
            $timeout.cancel($scope.loaderTimer);
            $scope.loaderTimer = $timeout(function () {
                $scope.loadLocationsList();
            }, 1000);
        });

        $interval(function(){$scope.loadLocationsList();}, 21600000); //reload assets every six hours.
    }

    return angular.
        module('assetsLocationsDetailsControllers', []).
        controller('AssetsLocationsDetailsController', [
            '$stateParams',
            '$scope',
            '$interval',
            '$timeout',
            'Stationspinner',
            'CharacterSelector',
            'AssetToolbar',
            AssetsLocationsDetailsController]);
};