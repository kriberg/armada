module.exports = function () {
    'use strict';

    function NavbarController($scope, $interval, $rootScope, Stationspinner, AccountService) {
        $scope.capsuler = null;
        $scope.corporations = [];
        $scope.logout = function() {
            AccountService.logout();
        };

        $scope.refresh = function () {
            $scope.capsuler = Stationspinner.Capsuler.get({username: $rootScope.username});
            $scope.corporations = Stationspinner.CorporationSheet.query();
        };
        $scope.refresh();

        $rootScope.$on('loggedIn', function(event, data) {
            $scope.refresh();
        });


        $interval(function(){$scope.refresh();}, 300000);
    }

    return angular.
        module('navbarControllers', ['ui.bootstrap']).
        controller('NavbarController', [
            '$scope',
            '$interval',
            '$rootScope',
            'Stationspinner',
            'AccountService',
            NavbarController]);
};