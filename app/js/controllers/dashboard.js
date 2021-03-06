module.exports = function () {
    'use strict';

    function DashboardController($scope, $interval, Stationspinner) {
        $scope.characters = Stationspinner.CharacterSheet.query();
        $scope.capsuler = Stationspinner.Capsuler.get();
        $scope.notifications = [];
        $scope.notificationsPagination = {
            currentPage: 1,
            itemsPerPage: 8,
            total: 0
        };
        $scope.missingTraining = Stationspinner.MissingTraining.query();
        $scope.newest = true;
        $scope.oldest = false;
        $scope.noCharacters = false;
        $scope.characters.$promise.then(function (characters) {
            if(characters.length < 1) {
                $scope.noCharacters = true;
            }
        });

        $scope.getNotificationsPage = function(pageNumber) {
            Stationspinner.Notifications.query({
                page: pageNumber
            }, function(data) {
                $scope.notifications = data.results;
                $scope.notificationsPagination.total = data.count;
                $scope.notificationsPagination.currentPage = pageNumber;
                //sidebar();
            });
        };

        $scope.getNotificationIcon = function (note) {
            if(note.typeID == 147) {
                //corp logo
                return 'https://imageserver.eveonline.com/Corporation/' + note.owner.corporationID + '_64.png';
            } else if(note.typeID == 160) {
                //alliance logo
                return 'https://imageserver.eveonline.com/Alliance/' + note.owner.allianceID + '_64.png';
            } else {
                return 'img/notifications/notificationIcon_' + note.typeID + '.png';
            }

        };

        $scope.getNotificationsPage($scope.notificationsPagination.currentPage);


        //sidebar();

        $scope.refresh = function () {
            $scope.characters = Stationspinner.CharacterSheet.query();
            $scope.notifications = $scope.getNotificationsPage($scope.notificationsPagination.currentPage);
            $scope.missingTraining = Stationspinner.MissingTraining.query();
        };
        $interval(function(){$scope.refresh();}, 300000);
    }

    return angular.
        module('dashboardControllers', []).
        controller('DashboardController', ['$scope', '$interval', 'Stationspinner', DashboardController]);
};