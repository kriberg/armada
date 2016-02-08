module.exports = function () {
    'use strict';

    function AssetsSearchingToolbarController($scope, AssetToolbar) {
        $scope.AssetToolbar = AssetToolbar;
    }

    return angular
        .module('assetsSearchingToolbarControllers', [])
        .controller('AssetsSearchingToolbarController', [
            '$scope',
            'AssetToolbar',
            AssetsSearchingToolbarController]);
};