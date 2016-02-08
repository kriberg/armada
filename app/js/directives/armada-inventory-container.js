module.exports = function () {
    'use strict';

    function ArmadaInventoryContainer() {
        return {
            restrict: 'E',
            scope: {
                container: '=container',
                locationID: '=locationID'
            },
            templateUrl: 'js/directives/armada-inventory-container.html'
        };
    }

    angular
        .module('armadaApp')
        .directive('armadaInventoryContainer', [ArmadaInventoryContainer]);
};
