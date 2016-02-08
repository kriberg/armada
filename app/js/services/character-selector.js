module.exports = function () {
    'use strict';

    function CharacterSelector($timeout, $interval, $cookies, $rootScope, Stationspinner, Colorize) {
        var service = {};

        service.characterSelection = [];
        service.availableCharacters = [];
        service.charactersHasLoaded = false;
        service.join_characterIDs = function () {
            return service.characterSelection.join(',')
        };

        service.loadCharacters = function (skipCookieLoading) {
            Stationspinner.CharacterSheet.query({short: true},
                function (availableCharacters) {
                    service.availableCharacters = availableCharacters;
                    angular.forEach(availableCharacters, function (character) {
                        character['type'] = 'character';
                        character['color'] = Colorize.identity(character['characterID']);
                    });
                    // After we've loaded the characterIDs, let's see if the user has selected characters
                    // previously. If not, just select all.
                    if (!skipCookieLoading) {
                        var cookieSelection = $cookies.getObject('CharactertSelector_characterSelection');
                        console.log('Cookie characters', cookieSelection);
                        service.characterSelection.length = 0;
                        angular.forEach(cookieSelection, function (characterID) {
                            if (angular.element.inArray(characterID, service.availableCharacters)) {
                                service.characterSelection.push(characterID);
                            }
                        });
                    }
                    service.charactersHasLoaded = true;
                });
        };
        service.loadCharacters(false);

        service.hasCharactersSelected = function () {
            return service.characterSelection.length;
        };
        service.colorize = function(identity) {
            return Colorize.identity(identity);
        };
        service._nameMap = {};
        service.reverseIdentity = function(identity) {
            var key = String(identity);
            if(service._nameMap.hasOwnProperty(key)) {
                return service._nameMap[key];
            } else {
                angular.forEach(service.availableCharacters, function(character) {
                    if(String(character.characterID) == key) {
                        service._nameMap[key] = character.name;
                        return service._nameMap[key];
                    }
                });
            }
            return identity;
        };

        service.loaderTimer = null;
        service.saveSelection = function () {
            $timeout.cancel(service.loaderTimer);
            service.loaderTimer = $timeout(function () {
                $cookies.putObject(
                    'CharactertSelector_characterSelection',
                    service.characterSelection
                );
                console.log('Saved cookie chars', $cookies.getObject('CharactertSelector_characterSelection'));
            }, 1000);
        };
        $interval(function () {
            service.loadCharacters(true);
        }, 7200000); //reload characterIDs every two hours.

        $rootScope.$on('loggedIn', function () {
            service.loadCharacters(false);
        });

        return service;
    }

    return angular.
        module('characterSelectorServices', []).
        factory('CharacterSelector', [
            '$timeout',
            '$interval',
            '$cookies',
            '$rootScope',
            'Stationspinner',
            'Colorize',
            CharacterSelector]);
};