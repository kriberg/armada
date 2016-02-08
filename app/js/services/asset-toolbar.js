module.exports = function () {
    'use strict';

    function AssetToolbar() {
        var service = {};
        service.orderDirection = false;
        service.assetOrdering = 'name';
        service.searchText = '';
        service.searchActive = false;
        service.placeholderText = 'search';
        service.search = function() {
            service.searchActive = true;
            service._searchCallback(service.searchText, service.searchActive);
        };
        service.clear = function () {
            service._clearCallback();
        };
        service._searchCallback = null;
        service._clearCallback = null;
        service.setSearchCallback = function (callback) {
            service._searchCallback = callback
        };
        service.setClearCallback = function (callback) {
            service._clearCallback = callback;
        };
        return service;
    }

    return angular.
        module('assetToolbarServices', []).
        factory('AssetToolbar', [AssetToolbar]);
};