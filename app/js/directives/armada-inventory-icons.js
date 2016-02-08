module.exports = function () {
    'use strict';
    function ArmadaInventoryIconsController($scope, CharacterSelector) {
        $scope.CharacterSelector = CharacterSelector;
    }

    function ArmadaInventoryIcons () {
        return {
            restrict: 'E',
            scope: {
                contents: '=contents',
                filterText: '=filterText',
                ordering: '=ordering',
                direction: '=direction'
            },
            templateUrl: 'js/directives/armada-inventory-icons.html',
            controller: ArmadaInventoryIconsController
        };
    }

    angular
        .module('armadaApp')
        .directive('armadaInventoryIcons', ArmadaInventoryIcons);
};