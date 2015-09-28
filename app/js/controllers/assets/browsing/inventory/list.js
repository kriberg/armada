module.exports = function () {
    'use strict';

    function AssetInventoryController($stateParams, $scope, $interval, $timeout, Stationspinner, ArmadaSettings, Colorize) {
        $scope.children = {};
        $scope.loadingContainers = true;
        $scope.loadingAssets = true;
        $scope.hangarItems = [];
        $scope.topLevelContainers = [];
        $scope.selectedContainer = -1;
        $scope.currentContainer = [];
        $scope.chunkSize = 20;
        $scope.inventoryDisplay = 'icons';
        $scope.nameMap = {};


        $scope.loadTopLevelAssets = function() {
            $scope.loadingContainers = true;
            var query_params = {
                characterIDs: $scope.$parent.characterSelection.join(','),
                locationID: $stateParams.locationID
            };
            Stationspinner.AssetLocations.query(query_params).$promise.then(function (location) {
                if(location.length == 1)
                    $scope.location = location[0];
            });
            return Stationspinner.Assets.query(query_params).$promise.then(function (assets) {
                $scope.topLevelContainers.length = 0;
                $scope.hangarItems.length = 0;
                angular.forEach(assets, function(asset) {
                    if(asset.container_volume > 0.0) {
                        $scope.topLevelContainers.push(asset);
                    } else {
                        $scope.hangarItems.push(asset);
                    }
                });
                if($stateParams.containerID) {
                    $scope.loadSubAssets($stateParams.containerID, true);
                }
                $scope.loadingContainers = false;
            });
        };

        $scope.loadSubAssets = function(itemID, activate) {
            if(activate)
                $scope.loadingAssets = true;
            var query_params = {
                characterIDs: $scope.$parent.characterSelection.join(','),
                locationID: $stateParams.locationID,
                parentID: itemID
            };
            Stationspinner.Assets.query(query_params).$promise.then(function (assets) {
                $scope.children[itemID] = assets;
                if (activate) {
                    $scope.currentContainer = $scope.children[itemID];
                    $scope.chunckSize = Math.ceil($scope.currentContainer.length/4);
                    $scope.loadingAssets = false;
                }
            });

        };

        $scope.activateContainer = function (index, container) {
            $scope.loadingAssets = true;
            $scope.selectedContainer = index;
            if (container == -1) {
                $scope.currentContainer = $scope.hangarItems;
                $scope.loadingAssets = false;
            } else {
                var itemID = container.itemID.toString();
                if($scope.children.hasOwnProperty(itemID)) {
                    //FIXME: cache invalidation
                    $scope.currentContainer = $scope.children[itemID];
                    $scope.chunckSize = Math.ceil($scope.currentContainer.length/4);
                    $scope.loadingAssets = false;
                } else {
                    $scope.loadSubAssets(itemID, true);
                }
            }
        };


        $scope.settingsDomain = 'AssetInventoryController';

        $scope.saveSetting = function(key, val) {
            ArmadaSettings.put($scope.settingsDomain, key, val);
        };

        $scope.loadSettings = function () {
            var inventoryDisplay = ArmadaSettings.get($scope.settingsDomain, 'inventoryDisplay');
            if(inventoryDisplay !== undefined) $scope.inventoryDisplay = inventoryDisplay;
        };

        $scope.getCurrentContainer = function () {
            if($scope.selectedContainer >= 0) {
                return $scope.topLevelContainers[$scope.selectedContainer];
            } else {

            }
        };

        $scope.colorize = function(identity) {
            return Colorize.identity(identity);
        };

        $scope.reverseIdentity = function(identity) {
            var key = String(identity);
            if($scope.nameMap.hasOwnProperty(key)) {
                return $scope.nameMap[key];
            } else {
                angular.forEach($scope.$parent.availableCharacters, function(character) {
                    if(String(character.characterID) == key) {
                        $scope.nameMap[key] = character.name;
                        return $scope.nameMap[key];
                    }
                });
            }
            return identity;
        };

        $scope.loaderPromise = null;
        $scope.$watchCollection('$parent.characterSelection', function() {
            $timeout.cancel($scope.loaderPromise);
            $scope.loaderPromise = $timeout(function () {
                $scope.loadTopLevelAssets();
            }, 1000);
        });



        $scope.refresh = function () {
            $scope.loadTopLevelAssets();
            $scope.loadSubAssets();
        };

        $scope.loadSettings();
        $scope.loadTopLevelAssets().then(function () {
            $scope.activateContainer(-1, -1);
        });

        $interval(function(){$scope.refresh();}, 21600000); //reload assets every six hours.
    }

    return angular.
        module('assetInventoryControllers', []).
        controller('AssetInventoryController', [
            '$stateParams',
            '$scope',
            '$interval',
            '$timeout',
            'Stationspinner',
            'ArmadaSettings',
            'Colorize',
            AssetInventoryController]);
};