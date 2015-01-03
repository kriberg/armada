(function () {
    'use strict';

    function DashboardController($scope, $interval, Stationspinner) {
        $scope.characters = Stationspinner.CharacterSheet.query();
        $scope.capsuler = Stationspinner.Capsuler.get();
        $scope.notifications = Stationspinner.Notifications.query();
        $scope.missingTraining = Stationspinner.MissingTraining.query();
        $scope.newest = true;
        $scope.oldest = false;

        $scope.refresh = function () {
            $scope.characters = Stationspinner.CharacterSheet.query();
            $scope.notifications = Stationspinner.Notifications.query();
            $scope.missingTraining = Stationspinner.MissingTraining.query();
        };
        $interval(function(){$scope.refresh();}, 300000);
    }

    angular.
        module('dashboardControllers', []).
        controller('DashboardController', ['$scope', '$interval', 'Stationspinner', DashboardController]);
}());