(function () {
    'use strict';

    function CharacterDetailsSkillsController($scope, $interval) {
        $scope.character = $scope.$parent.character;
    }


    angular.
        module('characterDetailsSkillsControllers', []).
        controller('CharacterDetailsSkillsController', [
            '$scope',
            '$interval',
            CharacterDetailsSkillsController]);
}());