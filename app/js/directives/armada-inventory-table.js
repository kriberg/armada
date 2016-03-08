module.exports = function () {
    'use strict';
    function ArmadaInventoryTableController($scope, CharacterSelector) {
        $scope.CharacterSelector = CharacterSelector;
    }

    function ArmadaInventoryTable () {
        return {
            restrict: 'E',
            scope: {
                contents: '=contents',
                filterText: '=filterText',
                ordering: '=ordering',
                direction: '=direction'
            },
            templateUrl: 'partials/directives/armada-inventory-table.html',
            controller: ArmadaInventoryTableController
        };
    }

    angular
        .module('armadaApp')
        .directive('armadaInventoryTable', ArmadaInventoryTable);
};