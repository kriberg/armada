module.exports = function () {
    'use strict';

    function CharacterDetailsSheetController($scope) {
        $scope.character = $scope.$parent.character;
        $scope.isFatigued = function(fatigueDate) {
            var d1 = new Date(fatigueDate);

            return d1 > Date.now();
        }
    }

    return angular.
        module('characterDetailsSheetControllers', []).
        controller('CharacterDetailsSheetController', [
            '$scope',
            CharacterDetailsSheetController]);
};