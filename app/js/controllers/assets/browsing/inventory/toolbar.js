module.exports = function () {
    'use strict';

    function AssetsInventoryToolbarController($scope, AssetToolbar) {
        $scope.AssetToolbar = AssetToolbar
    }

    return angular
        .module('assetsInventoryToolbarControllers', [])
        .controller('AssetsInventoryToolbarController', [
            '$scope',
            'AssetToolbar',
            AssetsInventoryToolbarController]);
};