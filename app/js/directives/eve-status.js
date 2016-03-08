module.exports = function () {
    'use strict';

    function EveStatus () {
        return {
            restrict: 'EA',
            templateUrl: 'partials/directives/eve-status.html'
        };
    }

    function EveStatusController($scope, $interval, $http) {
        $scope.clock = new Date();
        $scope.status = {
            'onlinePlayers': '0',
            'serverOpen': 'down'
        };

        $scope.refreshClock = function() {
            $scope.clock = new Date();
        };

        $scope.refreshServerStatus = function() {
            $http.get('/api/universe/tranquility/')
                .success(function (data) {
                    if(data.serverOpen == 'True')
                        $scope.status.server = 'online';
                    else
                        $scope.status.server = 'offline';
                    $scope.status.players = data.onlinePlayers;
                })
                .error(function (data) {
                    $scope.status.server = 'offline';
                    $scope.status.players = '0';
                });
        };

        $scope.refreshServerStatus();

        $interval(function(){ $scope.refreshClock(); }, 10000);
        $interval(function(){ $scope.refreshServerStatus(); }, 180000);

    }

    angular
        .module('armadaApp')
        .directive('eveStatus', EveStatus);

    angular.
        module('eveStatusControllers', []).
        controller('EveStatusController', ['$scope', '$interval', '$http', EveStatusController]);
};
