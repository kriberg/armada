module.exports = function () {
    'use strict';

    function ArmadaIdSelector () {
        return {
            restrict: 'E',
            scope: {
                selection: '=selection',
                values: '=values',
                display: '=display',
                identifier: '=identifier',
                colorize: '=colorize'
            },
            templateUrl: 'js/directives/armada-id-selector.html'
        };
    }

    return angular
        .module('armadaApp')
        .directive('armadaIdSelector', [ArmadaIdSelector]);
};