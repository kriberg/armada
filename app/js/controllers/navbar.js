(function () {
    'use strict';

    function NavbarController($scope, $interval, $cookieStore, $http, $rootScope, $location, Stationspinner) {
        $scope.capsuler = null;
        $scope.corporations = [];
        $scope.logout = function() {
            $cookieStore.remove('djangotoken');
            $http.defaults.headers.common['Authorization'] = null;
            $rootScope.loggedInUser = false;
            $scope.capsuler = null;
            $scope.corporations = [];
            $location.path('/login');
        };

        $scope.refresh = function () {
            if($cookieStore.get('djangotoken')) {
                $scope.capsuler = Stationspinner.Capsuler.get();
                $scope.corporations = Stationspinner.CorporationSheet.query();
            }
        };
        $scope.refresh();

        $rootScope.$on('loggedIn', function(event, data) {
            $scope.refresh();
        });

        $interval(function(){$scope.refresh();}, 300000);
    }

    angular.
        module('navbarControllers', ['ui.bootstrap']).
        controller('NavbarController', [
            '$scope',
            '$interval',
            '$cookieStore',
            '$http',
            '$rootScope',
            '$location',
            'Stationspinner',
            NavbarController]);
}());