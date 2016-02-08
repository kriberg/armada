module.exports = function () {
    'use strict';

    function AssetsInventoryController($stateParams, $scope, $interval, $timeout, Stationspinner, ArmadaSettings,
                                      CharacterSelector, AssetToolbar) {
        $scope.containers = {};
        $scope.loadingContainers = false;
        $scope.loadingAssets = false;
        $scope.itemHangarItems = [];
        $scope.itemHangarContainers = [];
        $scope.itemHangarValue = 0.0;
        $scope.itemHangarVolume = 0.0;
        $scope.shipHangarHulls = [];
        $scope.shipHangarContainers = [];
        $scope.shipHangarValue = 0.0;
        $scope.shipHangarVolume = 0.0;
        $scope.selectedContainer = 0;
        $scope.currentContainer = [];
        $scope.chunkSize = 20;
        AssetToolbar.inventoryDisplay = 'icons';
        $scope.nameMap = {};
        $scope.AssetToolbar = AssetToolbar;
        AssetToolbar.placeholderText = 'Item type';


        $scope.loadTopLevelAssets = function() {
            console.log('loadTopLevelAssets');
            if($scope.loadingContainers || !CharacterSelector.charactersHasLoaded) return;
            $scope.loadingContainers = true;
            var query_params = {
                characterIDs: CharacterSelector.join_characterIDs(),
                locationID: $stateParams.locationID
            };
            Stationspinner.AssetLocations.query(query_params).$promise.then(function (location) {
                if(location.length == 1)
                    $scope.location = location[0];
            });
            return Stationspinner.Assets.query(query_params).$promise.then(function (assets) {
                $scope.itemHangarContainers.length = 0;
                $scope.itemHangarItems.length = 0;
                $scope.shipHangarHulls.length = 0;
                $scope.shipHangarContainers.length = 0;
                angular.forEach(assets, function(asset) {
                    if(asset.container_volume > 0.0) {
                        //container groupIDs
                        if(angular.element.inArray(asset.groupID, [12,340,448,649]) >= 0) {
                            $scope.itemHangarContainers.push(asset);
                            $scope.itemHangarValue += asset.container_value + asset.value;
                            $scope.itemHangarVolume += asset.container_volume + asset.volume;
                        } else
                        //ships
                        if(asset.categoryID == 6) {
                            $scope.shipHangarContainers.push(asset);
                            $scope.shipHangarValue += asset.container_value + asset.value;
                            $scope.shipHangarVolume += asset.container_volume + asset.volume;
                        } else {
                            $scope.itemHangarItems.push(asset);
                            $scope.itemHangarValue += asset.container_value + asset.value;
                            $scope.itemHangarVolume += asset.container_volume + asset.volume;
                        }
                    } else {
                        if(asset.categoryID == 6) {
                            if(asset.singleton) {
                                $scope.shipHangarContainers.push(asset);
                                $scope.shipHangarValue += asset.container_value + asset.value;
                                $scope.shipHangarVolume += asset.container_volume + asset.volume;
                            } else {
                                $scope.shipHangarHulls.push(asset);
                                $scope.shipHangarValue += asset.container_value + asset.value;
                                $scope.shipHangarVolume += asset.container_volume + asset.volume;
                            }
                        } else {
                            $scope.itemHangarItems.push(asset);
                            $scope.itemHangarValue += asset.container_value + asset.value;
                            $scope.itemHangarVolume += asset.container_volume + asset.volume;
                        }
                    }
                });
                if($stateParams.containerID > 1) {
                    $scope.loadContainerAssets($stateParams.containerID, true);
                } else {
                    $scope.activateContainer($stateParams.containerID, $stateParams.containerID);
                }
                $scope.loadingContainers = false;
            });
        };

        $scope.loadContainerAssets = function(itemID, activate) {
            console.log('loadContainerAssets', itemID, activate);
            Stationspinner.Assets.get({
                characterIDs: CharacterSelector.join_characterIDs(),
                itemID: itemID
            }, function (itemData) {
                console.log('Fetched asset', itemID, itemData);
                $scope.activeItem = itemData;
            }, function (response) {
                console.log('Error fetching asset', itemID, response.status);
            });

            //$scope.loadingAssets = activate;
            var query_params = {
                characterIDs: CharacterSelector.join_characterIDs(),
                locationID: $stateParams.locationID,
                parentID: itemID
            };
            Stationspinner.Assets.query(query_params,
                function (assets) {
                    console.log('Loaded assets for itemID', itemID, assets);
                    $scope.containers[itemID] = assets;
                    if (activate) {
                        $scope.currentContainer = $scope.containers[itemID];
                        //$scope.loadingAssets = false;
                    }
                },
                function (response) {
                    console.log('Error fetching assets for itemID', itemID, response.status);
                }
            );
        };

        $scope.activateContainer = function (index, container) {
            console.log('Activate container', index, container);
            $scope.loadingAssets = true;
            if (container == 0) {
                console.log('Activating itemHangar', $scope.itemHangarItems);
                $scope.selectedContainer = 0;
                $scope.currentContainer = $scope.itemHangarItems;
                $scope.loadingAssets = false;
            } else if (container == 1) {
                console.log('Activating shipHangar', $scope.shipHangarHulls);
                $scope.selectedContainer = 1;
                $scope.currentContainer = $scope.shipHangarHulls;
                $scope.loadingAssets = false;
            } else {
                var itemID = container.itemID.toString();
                console.log('Activating', container.typeName, container.itemID);
                if($scope.containers.hasOwnProperty(itemID)) {
                    //FIXME: cache invalidation
                    $scope.currentContainer = $scope.containers[itemID];
                    $scope.loadingAssets = false;
                } else {
                    $scope.loadContainerAssets(itemID, true);
                }
            }
        };

        $scope.settingsDomain = 'AssetInventoryController';

        AssetToolbar.saveSetting = function(key, val) {
            ArmadaSettings.put($scope.settingsDomain, key, val);
        };

        AssetToolbar.loadSettings = function () {
            var inventoryDisplay = ArmadaSettings.get($scope.settingsDomain, 'inventoryDisplay');

            if(inventoryDisplay !== undefined)
                AssetToolbar.inventoryDisplay = inventoryDisplay;
        };

        $scope.loaderTimer = null;
        $scope.$watchCollection('CharacterSelector.characterSelection', function() {
            if(!CharacterSelector.charactersHasLoaded) return;
            $timeout.cancel($scope.loaderTimer);
            $scope.loaderTimer = $timeout(function () {
                $scope.loadTopLevelAssets();
            }, 1000);
        });

        $scope.refresh = function () {
            $scope.loadTopLevelAssets();
            $scope.loadContainerAssets();
        };

        AssetToolbar.loadSettings();
        $interval(function(){$scope.refresh();}, 21600000); //reload assets every six hours.
    }

    return angular.
        module('assetsInventoryControllers', []).
        controller('AssetsInventoryController', [
            '$stateParams',
            '$scope',
            '$interval',
            '$timeout',
            'Stationspinner',
            'ArmadaSettings',
            'CharacterSelector',
            'AssetToolbar',
            AssetsInventoryController]);
};