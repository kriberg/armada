module.exports = function () {
    'use strict';

    function EveType () {
        return {
            restrict: 'E',
            scope: {
                type: '=type',
                hover: '=hover',
                icon: '=icon',
                displayField: '=displayField'
            },
            templateUrl: 'js/directives/eve-type.html',
            controller: function($scope, Stationspinner) {
                if(!$scope.displayField) $scope.displayField = 'typeName';
                if($scope.hover) {
                    Stationspinner.InvType.get({typeID: $scope.type.typeID}).$promise.then(function(invType) {
                        $scope.description = invType.description.replace(/\n/g, "<br />");
                    });
                }
            }
        };
    }

    angular
        .module('armadaApp')
        .directive('eveType', ['Stationspinner', EveType]);
};