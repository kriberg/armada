(function () {
    'use strict';

    function CharacterListController($scope, $interval, Stationspinner) {
        $scope.characters = Stationspinner.CharacterSheet.query();
        $scope.capsuler = Stationspinner.Capsuler.get();

        $scope.refresh = function () {
            $scope.characters = Stationspinner.CharacterSheet.query();
        };

        $interval(function(){$scope.refresh();}, 300000);
        $scope.foo = 'foo';
    }

    angular.
        module('characterListControllers', []).
        controller('CharacterListController', ['$scope', '$interval', 'Stationspinner', CharacterListController]);
}());