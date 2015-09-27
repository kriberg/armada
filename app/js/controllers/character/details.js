(function () {
    'use strict';

    function CharacterDetailsController($stateParams, $scope, $interval, Stationspinner) {
        $scope.character = Stationspinner.CharacterSheet.get({characterID: $stateParams.characterID});
        $scope.name = $stateParams.characterName;

        $scope.refresh = function () {
            Stationspinner.CharacterSheet.get({characterID: $stateParams.characterID}).$promise.then(function (character) {
                $scope.character = character;
                $scope.name = character.name;
            });
        };
        $interval(function(){$scope.refresh();}, 60000);
    }

    angular.
        module('characterDetailsControllers', []).
        controller('CharacterDetailsController', [
            '$stateParams',
            '$scope',
            '$interval',
            'Stationspinner',
            CharacterDetailsController]);
}());