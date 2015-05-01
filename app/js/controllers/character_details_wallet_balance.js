(function () {
    'use strict';

    function CharacterDetailsWalletBalanceController($scope, $stateParams, $interval, Stationspinner) {
        $scope.character = $scope.$parent.$parent.character || Stationspinner.CharacterSheet.get({characterID: $stateParams.characterID});

        $scope.walletData = Stationspinner.CharacterWallet.query({characterID: $stateParams.characterID});

        $scope.walletChartOptions = {
            "chart": {
                "type": "cumulativeLineChart",
                "height": 450,
                "margin": {
                    "top": 20,
                    "right": 20,
                    "bottom": 60,
                    "left": 65
                },
                "color": [
                    "#1f77b4",
                    "#ff7f0e",
                    "#2ca02c",
                    "#d62728",
                    "#9467bd",
                    "#8c564b",
                    "#e377c2",
                    "#7f7f7f",
                    "#bcbd22",
                    "#17becf"
                ],
                "transitionDuration": 300,
                "useInteractiveGuideline": true,
                "clipVoronoi": false,
                "xAxis": {
                    "axisLabel": "X Axis",
                    "showMaxMin": false,
                    "staggerLabels": true
                },
                "yAxis": {
                    "axisLabel": "Y Axis",
                    "axisLabelDistance": 20
                }

            }
        }
    }

    angular.
        module('characterDetailsWalletBalanceControllers', []).
        controller('CharacterDetailsWalletBalanceController', [
            '$scope',
            '$stateParams',
            '$interval',
            'Stationspinner',
            CharacterDetailsWalletBalanceController]);
}());