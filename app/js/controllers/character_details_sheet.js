(function () {
    'use strict';

    function CharacterDetailsSheetController($scope, $interval) {
        $scope.character = $scope.$parent.character;
        //$interval(function(){$scope.$parent.refresh();}, 300000);
    }

    angular.
        module('characterDetailsSheetControllers', []).
        controller('CharacterDetailsSheetController', [
            '$scope',
            '$interval',
            CharacterDetailsSheetController]);
}());