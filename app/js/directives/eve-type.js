(function () {
    'use strict';

    function EveType () {
        return {
            restrict: 'E',
            scope: {
                type: '=type',
                hover: '=?hover',
                icon: '=?icon'
            },
            templateUrl: 'js/directives/eve-type.html',
            controller: function($scope, Stationspinner) {
                $scope.icon = $scope.icon || true;
                $scope.hover = $scope.hover || false;
                if($scope.hover) {
                    Stationspinner.InvType.get({typeID: $scope.type.typeID}).$promise.then(function(invType) {
                        $scope.description = invType.description;
                    });
                }
            }
        };
    }

    angular
        .module('armadaApp')
        .directive('eveType', ['Stationspinner', EveType]);
}());