(function () {
    'use strict';

    function EVEMailController($scope, $interval, Stationspinner) {
        $scope.mails = Stationspinner.MailMessage.query();
        $scope.characters = Stationspinner.CharacterSheet.query();
        $scope.collapse = {};

        $scope.rigCollapse = function () {
            $scope.characters.forEach(function (character) {
                $scope.collapse[character.name] = true;
            });
        };
        $scope.rigCollapse();

        $scope.collapse = function(name) {
            $scope.collapse[name] = !$scope.collapse[name];
        };

        $scope.refresh = function () {
            $scope.mails = Stationspinner.MailMessage.query();
            $scope.characters = Stationspinner.CharacterSheet.query();
            $scope.rigCollapse();
        };

        $interval(function(){$scope.refresh();}, 60000);
    }

    angular.
        module('evemailControllers', []).
        controller('EVEMailController', ['$scope', '$interval', 'Stationspinner', EVEMailController]);
}());