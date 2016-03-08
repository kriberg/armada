module.exports = function () {
    'use strict';

    function APIKey() {
        return {
            restrict: 'E',
            scope: {
                key: '=key'
            },
            templateUrl: 'partials/directives/api-key.html',
            replace: true
        };
    }

    return angular
        .module('armadaApp')
        .directive('apiKey', APIKey);
};