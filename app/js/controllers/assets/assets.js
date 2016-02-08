module.exports = function () {
    'use strict';

    function AssetsController($scope, $timeout, $state, CharacterSelector) {
        $scope.CharacterSelector = CharacterSelector;
        var saveSelectionTimer = null;
        $scope.$watchCollection('CharacterSelector.characterSelection', function () {
            if (saveSelectionTimer) $timeout.cancel(saveSelectionTimer);
            saveSelectionTimer = $timeout(function () {
                CharacterSelector.saveSelection();
            }, 3000);
        });
        if($state.current.name == 'assets')
            $state.go('assets.summary');
    }

    return angular
        .module('assetsControllers', [])
        .controller('AssetsController', [
            '$scope',
            '$timeout',
            '$state',
            'CharacterSelector',
            AssetsController]);
};