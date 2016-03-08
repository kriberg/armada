module.exports = function () {
    'use strict';

    var c3 = require('c3');

    function ArmadaChartAssetWorthController($scope, $filter, Colorize, Stationspinner) {
        $scope.loadGraph = function () {
            Stationspinner.CharacterAssetWorth.summary({characterIDs: $scope.characterIds.join(',')}, function (summary) {
                var colors = {};
                var dates = {};
                var columns = [];
                var characters = [];

                angular.forEach(summary, function (character) {
                    colors[character.name] = Colorize.identity(character.owner);
                    characters.push(character.name);
                    angular.forEach(character.entries, function (entry) {
                        if (!dates.hasOwnProperty(entry.registered))
                            dates[entry.registered] = {
                                date: new Date(entry.registered.split('T')[0])
                            };
                        dates[entry.registered][character.name] = entry.value;
                    });
                });
                for (var date in dates) {
                    if (dates.hasOwnProperty(date))
                        columns.push(dates[date]);
                }
                $scope.distribution = c3.generate({
                    bindto: $scope.container,
                    data: {
                        colors: colors,
                        json: columns,
                        keys: {
                            value: characters,
                            x: 'date'
                        }
                    },
                    tooltip: {
                        format: {
                            value: function (value, ratio, id) {
                                return $filter('iskify')(value) + ' isk';
                            },
                            title: function (x) {
                                return x.toDateString();
                            }
                        }
                    },
                    legend: {
                        position: 'right'
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                outer: false,
                                fit: false
                            }
                        },
                        y: {
                            tick: {
                                outer: false,
                                format: function (y) {
                                    return $filter('quantify')(y) + ' isk';
                                }
                            }
                        }
                    }
                });
            });
        };

        $scope.$watchCollection('characterIds', $scope.loadGraph);
    }

    function ArmadaChartAssetWorth () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                characterIds: '=characterIds'
            },
            templateUrl: 'partials/directives/armada-chart-asset-worth.html',
            controller: ArmadaChartAssetWorthController,
            link: function (scope, element, attrs) {
                scope.container = element.children()[0];
            }
        };
    }

    angular
        .module('armadaApp')
        .directive('armadaChartAssetWorth', ArmadaChartAssetWorth);
};
