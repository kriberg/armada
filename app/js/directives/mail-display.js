(function () {
    'use strict';

    function MailDisplay () {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/mail-display.html',
            scope: {
                mail: '=mail'
            }
        };
    }

    function MailDisplayController($scope) {
        $scope.colors = {
            0: '#99D78B', // character
            1: '#7BA5D6', // alliance or corporation
            2: '#CDA64B'  // mailing list
        };
        $scope.colorize = function(type) {
            return {'background-color': $scope.colors[type]};
        }
    }

    angular
        .module('armadaApp')
        .directive('mailDisplay', MailDisplay);

    angular.
        module('mailDisplayControllers', []).
        controller('MailDisplayController', ['$scope', MailDisplayController]);
}());