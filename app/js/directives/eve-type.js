module.exports = function () {
    'use strict';

    function EveTypeController ($scope, EveIcons, Stationspinner) {
        if(!$scope.displayField) $scope.displayField = 'typeName';
        if($scope.icon) {
            if (!$scope.iconSize) $scope.iconSize = 32;
            $scope.iconURL = EveIcons.getIconURL($scope.type.typeID, $scope.iconSize);
        }
        if($scope.hover) {
            Stationspinner.InvType.get({typeID: $scope.type.typeID},
                function (invType) {
                    if(!invType.description) {
                        console.log('Type', $scope.type.typeID, 'has no description');
                        $scope.description = '';
                    } else {
                        $scope.description = invType.description.replace(/\n/g, "<br />");
                    }
                },
                function (response) {
                    $scope.description = 'Could not fetch item description: ' + response.status;
                }
            );
        }
    }

    function EveType () {
        return {
            restrict: 'E',
            scope: {
                type: '=type',
                hover: '=hover',
                icon: '=icon',
                iconSize: '=iconSize',
                displayField: '=displayField'
            },
            templateUrl: 'js/directives/eve-type.html',
            controller: EveTypeController
        };
    }

    angular
        .module('armadaApp')
        .directive('eveType', ['Stationspinner', EveType]);
};