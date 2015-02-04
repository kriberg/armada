(function () {
    'use strict';

    function EVEMailController($scope,
                               $interval,
                               Stationspinner) {

        $scope.filters = {};
        $scope.mapping = {};

        Stationspinner.CharacterSheet.query().$promise.then(function (characters) {
            $scope.characters = characters;
            $scope.characters.forEach(function (character) {
                $scope.filters[character.name] = true;
                $scope.mapping[character.name] = character;
            });
        });
        Stationspinner.DistinctCorporations.query().$promise.then(function (corporations) {
            $scope.corporations = corporations;
            $scope.corporations.forEach(function (corporation) {
                $scope.filters[corporation.corporationName] = false;
                $scope.mapping[corporation.corporationName] = corporation;
            });
        });
        Stationspinner.DistinctAlliances.query().$promise.then(function (alliances) {
            $scope.alliances = alliances;
            $scope.alliances.forEach(function (alliance) {
                $scope.filters[alliance.allianceName] = true;
                $scope.mapping[alliance.allianceName] = alliance;
            });
        });
        $scope.searchQuery = '';
        $scope.searchLanguage = 'english';
        $scope.searchLanguages = Stationspinner.SearchLanguages.get();

        $scope.setLanguage = function(language) {
            $scope.searchLanguage = language;
        };
        $scope.search = function () {
            if($scope.searchQuery == '') {
                $scope.mails = Stationspinner.Mail.query();
                $scope.orderField = 'sentDate';
            } else {
                var terms = {
                    search: $scope.searchQuery,
                    language: $scope.searchLanguage
                };
                $scope.mails = Stationspinner.Mail.query(terms);
                $scope.orderField = 'relevancy';
            }
            $scope.currentPage = 1;
        };
        $scope.search();

        $scope.searchReset = function () {
            $scope.searchQuery = '';
            $scope.search();
        };

        $scope.toggleFilter = function (name) {
            $scope.filters[name] = !$scope.filters[name];
        };

        $scope.showMail = function (mail) {
            console.log(mail);
            $scope.activeMail = mail;
        };

        $scope.mailRefresh = function () {
            if($scope.searchQuery.length > 0)
                $scope.search();
            else {
                $scope.mails = Stationspinner.Mail.query();
            }
        };

        $scope.filterRefresh = function () {
            $scope.characters = Stationspinner.CharacterSheet.query();
            $scope.corporations = Stationspinner.DistinctCorporations.query();
            $scope.alliances = Stationspinner.DistinctAlliances.query();
        };

        $interval(function(){$scope.filterRefresh();}, 600000);
        $interval(function(){$scope.mailRefresh();}, 300000);

        angular.element(window).resize(function () {
            sidebar();
        });
        angular.element(document).ready(function () {
            sidebar();
        });
    }

    angular.
        module('evemailControllers', []).
        controller('EVEMailController', [
            '$scope',
            '$interval',
            'Stationspinner',
            EVEMailController]);
}());