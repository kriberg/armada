(function () {
    'use strict';

    function APIKey() {
        return {
            restrict: 'E',
            scope: {
                key: '=key'
            },
            templateUrl: 'js/directives/api-key.html',
            replace: true
        };
    }

    angular
        .module('armadaApp')
        .directive('apiKey', APIKey);
}());