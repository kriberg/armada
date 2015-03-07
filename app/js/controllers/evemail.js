(function () {
    'use strict';

    function EVEMailController($scope,
                               $interval,
                               $timeout,
                               $http,
                               $q,
                               $cookieStore,
                               Stationspinner) {

        $scope.filters = {};
        $scope.mapping = {};
        $scope.lastRefresh = '';

        var tempFilters = $cookieStore.get('armada_evemail_filters');
        if(tempFilters) {
            $scope.filters = tempFilters;
        }


        $scope.searchQuery = '';
        $scope.searchLanguage = 'english';
        $scope.searchLanguages = Stationspinner.SearchLanguages.get();

        $scope.setLanguage = function(language) {
            $scope.searchLanguage = language;
        };

        $scope.getFilters = function (terms) {
            var query = {};
            var IDs = [];
            for(var ID in $scope.filters) {
                if($scope.filters.hasOwnProperty(ID) && $scope.filters[ID])
                    IDs.push(ID);
            }
            query.owners = IDs.join();
            if(terms) {
                query.search = terms.search;
                query.language = terms.language;
            }

            return query;
        };

        $scope.refreshMergeFilters = function () {
            var chars = Stationspinner.CharacterSheet.query().$promise.then(function (characters) {
                $scope.characters = characters;
                $scope.characters.forEach(function (character) {
                    if(!character.characterID in $scope.filters) {
                        $scope.filters[character.characterID] = true;
                    }
                    $scope.mapping[character.name] = character;
                });
            });
            var corps = Stationspinner.DistinctCorporations.query().$promise.then(function (corporations) {
                $scope.corporations = corporations;
                $scope.corporations.forEach(function (corporation) {
                    if(!corporation.corporationID in $scope.filters) {
                        $scope.filters[corporation.corporationID] = true;
                    }
                    $scope.mapping[corporation.corporationName] = corporation;
                });
            });
            var alliances = Stationspinner.DistinctAlliances.query().$promise.then(function (alliances) {
                $scope.alliances = alliances;
                $scope.alliances.forEach(function (alliance) {
                    if(!alliance.allianceID in $scope.filters) {
                        $scope.filters[alliance.allianceID] = true;
                    }
                    $scope.mapping[alliance.allianceName] = alliance;
                });
            });
            return [chars, corps, alliances];
        };

        $scope.getMail = function () {
            if($scope.searchQuery == '') {
                $scope.mails = Stationspinner.Mail.query($scope.getFilters());
                $scope.orderField = 'sentDate';
            } else {
                var terms = {
                    search: $scope.searchQuery,
                    language: $scope.searchLanguage
                };
                $scope.mails = Stationspinner.Mail.query($scope.getFilters(terms));
                $scope.orderField = 'relevancy';
            }
            $scope.currentPage = 1;
            $scope.lastRefresh = Date.now();
        };

        $q.all($scope.refreshMergeFilters()).then(function () {
            $cookieStore.put('armada_evemail_filters', $scope.filters);
            $scope.getMail();
        });

        $scope.searchReset = function () {
            $scope.searchQuery = '';
            $scope.getMail();
        };

        $scope.mailRefreshTimeout = null;

        $scope.toggleFilter = function (name) {
            $scope.filters[name] = !$scope.filters[name];
            $cookieStore.put('armada_evemail_filters', $scope.filters);
            if($scope.mailRefreshTimeout) {
                $timeout.cancel($scope.mailRefreshTimeout);
            }
            $scope.mailRefreshTimeout = $timeout(function () {
                $scope.getMail();
            }, 2000);
            $scope.mailRefreshTimeout.then(function () {
                $scope.mailRefreshTimeout = null;
            });

        };

        $scope.toggleAllFilters = function (status) {
            $scope.characters.forEach(function (character) {
                $scope.filters[character.characterID] = status;
            });
            $scope.corporations.forEach(function (corporation) {
                $scope.filters[corporation.corporationID] = status;
            });
            $scope.alliances.forEach(function (alliance) {
                $scope.filters[alliance.allianceID] = status;
            });
            $cookieStore.put('armada_evemail_filters', $scope.filters);
            $scope.getMail();
        };

        $scope.selectMail = function (mail, $event) {
            if(!mail.read) {
                mail.read = true;
                $http.post('/evemail/MailStatus/', {'messageIDs': mail.messageID});
            }
            $scope.activeMail = mail;
        };

        $scope.markAllRead = function () {
            var messageIDs = [];
            $scope.mails.forEach(function (mail) {
                if(!mail.read) {
                    messageIDs.push(mail.messageID);
                    mail.read = true;
                }
            });
            $http.post('/evemail/MailStatus/', {'messageIDs': messageIDs});
        };


        $interval(function() {
            $q.all($scope.refreshMergeFilters()).then(function () {
                $cookieStore.put('armada_evemail_filters', $scope.filters);
            });
        }, 600000);

        $interval(function() {
            $scope.getMail();
        }, 300000);

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
            '$timeout',
            '$http',
            '$q',
            '$cookieStore',
            'Stationspinner',
            EVEMailController]);
}());