module.exports = function () {
    'use strict';

    var c3 = require('c3');

    function ArmadaChartAssetDistributionController($scope, $filter, Colorize, Stationspinner) {
        $scope.loadGraph = function () {
            Stationspinner.Assets.summary({characterIDs: $scope.characterIds.join(',')})
                .$promise.then(function (summary) {
                var colors = {};
                var columns = [];
                var total = 0;

                angular.forEach(summary, function (character) {
                    colors[character.name] = Colorize.identity(character.owner);
                    character.value = parseFloat(character.value);
                    columns.push([character.name, character.value]);
                    total += character.value;
                });
                $scope.distribution = c3.generate({
                    bindto: $scope.container,
                    data: {
                        colors: colors,
                        columns: columns,
                        type: 'donut'
                    },
                    donut: {
                        title: $filter('quantify')(total) + ' isk'
                    },
                    tooltip: {
                        format: {
                            value: function (value, ratio, id) {
                                return $filter('quantify')(value) + ' isk';
                            }
                        }
                    },
                    legend: {
                        position: 'right'
                    }
                });
            });
        };

        $scope.$watchCollection('characterIds', $scope.loadGraph);
    }

    function ArmadaChartAssetDistribution () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                characterIds: '=characterIds'
            },
            templateUrl: 'partials/directives/armada-chart-asset-distribution.html',
            controller: ArmadaChartAssetDistributionController,
            link: function (scope, element, attrs) {
                scope.container = element.children()[0];
            }
        };
    }

    angular
        .module('armadaApp')
        .directive('armadaChartAssetDistribution', ArmadaChartAssetDistribution);
};
