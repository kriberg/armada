module.exports = function () {
    'use strict';

    function AssetsSummaryController($scope, CharacterSelector) {
        $scope.CharacterSelector = CharacterSelector;
    }

    return angular
        .module('assetsSummaryControllers', [])
        .controller('AssetsSummaryController', [
            '$scope',
            'CharacterSelector',
            AssetsSummaryController]);
};