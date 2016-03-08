module.exports = function () {
    'use strict';

    function ArmadaShipLayoutController($scope, EveIcons, Stationspinner, CharacterSelector) {
        $scope.parsed = false;
        $scope.CharacterSelector = CharacterSelector;
        $scope.iconURL = EveIcons.getShipURL($scope.activeItem.typeID, 128);
        Stationspinner.InvType.get({typeID: $scope.activeItem.typeID},
            function (invType) {
                $scope.shipDescription = invType.description.replace(/\n/g, "<br />");
            },
            function (response) {
                console.log('Could not fetch item description: ' + response.status);
            }
        );

        $scope.$watchCollection('contents', function() {
            $scope.fitting = {};
            $scope.loadedAmmo = {};
            $scope.cargoBay = [];
            $scope.droneBay = [];
            $scope.stackedDroneBay = [];
            $scope.low = [];
            $scope.med = [];
            $scope.high = [];
            $scope.rigs = [];
            $scope.subSystems = [];
            $scope.fleetHangar = [];
            $scope.shipHangar = [];
            $scope.parsed = false;
            if ($scope.contents.length == 0) return;
            var droneStack = {};
            angular.forEach($scope.contents, function (item) {
                var flag = item.flag;
                if (flag == 5 || flag == 87 || flag == 90 || flag == 155) {
                    switch (flag) {
                        case 87:
                            $scope.droneBay.push(item);
                            if(!droneStack.hasOwnProperty(item.name)) {
                                var drone = {
                                    name: item.name,
                                    quantity: item.quantity,
                                    typeID: item.typeID,
                                    item_value: item.item_value,
                                    item_volume: item.item_volume
                                };
                                droneStack[item.name] = drone;
                                $scope.stackedDroneBay.push(drone);
                            } else {
                                droneStack[item.name].quantity += item.quantity;
                                droneStack[item.name].item_value += item.item_value;
                                droneStack[item.name].item_volume += item.item_volume;
                            }
                            break;
                        case 5:
                            $scope.cargoBay.push(item);
                            break;
                        case 90:
                            $scope.shipHangar.push(item);
                            break;
                        case 155:
                            $scope.fleetHangar.push(item);
                            break;
                        default:
                            console.log('Unknown item flag', flag, item);
                            break;
                    }
                } else {
                    if(item.singleton) {
                        $scope.fitting[String(flag)] = item;

                        // low slots
                        if(flag >= 11 && flag <= 18) {
                            $scope.low.push(item);
                        } else
                        if(flag >= 19 && flag <= 26) {
                            $scope.med.push(item);
                        } else
                        if(flag >= 27 && flag <= 34) {
                            $scope.high.push(item);
                        } else
                        if(flag >= 92 && flag <= 99) {
                            $scope.rigs.push(item);
                        } else
                        if(flag >= 125 && flag <= 132) {
                            $scope.subSystems.push(item);
                        }
                    } else {
                        $scope.loadedAmmo[String(flag)] = item;
                    }
                }
            });

            $scope.parsed = true;

            $scope.hasAmmo = function (item) {
                return $scope.loadedAmmo.hasOwnProperty(String(item.flag));
            };

            $scope.getAmmoName = function (item) {
                return $scope.loadedAmmo[String(item.flag)].name;
            };
        });

        $scope.getStackedDroneBay = function () {
            if(!$scope.parsed) return;
            var stacks = {};
            angular.forEach($scope.droneBay, function (drone) {
                if(!stacks.hasOwnProperty(drone.typeName)) {
                    stacks[drone.typeName] = angular.copy(drone);
                    stacks[drone.typeName].singleton = false;
                } else {
                    stacks[drone.typeName].quantity += drone.quantity;
                }

            });
            return stacks;
        };
    }

    function ArmadaShipLayout() {
        return {
            restrict: 'E',
            scope: {
                activeItem: '=activeItem',
                contents: '=contents',
                display: '=display',
                filterText: '=filterText',
                ordering: '=ordering',
                direction: '=direction',
                showCargo: '=?showCargo',
                showDrones: '=?showDrones'
            },
            templateUrl: 'partials/directives/armada-ship-layout.html',
            controller: ArmadaShipLayoutController
        };
    }

    angular
        .module('armadaApp')
        .directive('armadaShipLayout', ArmadaShipLayout);
};