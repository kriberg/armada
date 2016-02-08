module.exports = function () {
    'use strict';

    function AssetsBrowsingToolbarController($scope, AssetToolbar) {
        $scope.AssetToolbar = AssetToolbar
    }

    return angular
        .module('assetsBrowsingToolbarControllers', [])
        .controller('AssetsBrowsingToolbarController', [
            '$scope',
            'AssetToolbar',
            AssetsBrowsingToolbarController]);
};