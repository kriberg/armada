module.exports = function () {
    'use strict';

    function AssetsBrowsingController($state) {
        if($state.current.name == 'assets.browsing')
            $state.go('assets.browsing.locations');
    }

    return angular.
        module('assetsBrowsingControllers', []).
        controller('AssetsBrowsingController', [
            '$state',
            AssetsBrowsingController]);
};