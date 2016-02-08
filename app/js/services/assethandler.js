module.exports = function () {
    'use strict';

    function AssetHandler($rootScope, $interval, $timeout, $cookies, Stationspinner) {
        var service = {};
        service.availableCharacters = [];
        service.characterSelection = [];

        service.loadCharacters = function (skipCookieLoading) {
            Stationspinner.CharacterSheet.query({short: true}).$promise.then(function (availableCharacters) {
                service.availableCharacters.length = 0;
                angular.forEach(availableCharacters, function (character) {
                    character['type'] = 'character';
                    service.availableCharacters.push(character);
                });
                // After we've loaded the characterIDs, let's see if the user has selected characters
                // previously. If not, just select all.
                if(!skipCookieLoading) {
                    var cookieSelection = $cookies.getObject('AssetsController_characterSelection');
                    if (cookieSelection instanceof Array) {
                        angular.forEach(cookieSelection, function (characterID) {
                            if (angular.element.inArray(characterID, service.availableCharacters)) {
                                service.characterSelection.push(characterID);
                            }
                        });
                    } else {
                        angular.forEach(service.availableCharacters, function (character) {
                            service.characterSelection.push(character.characterID);
                        });
                    }
                }
                console.log(service.availableCharacters);
                console.log(service.characterSelection);
            });
        };
        service.loadCharacters(false);

        service.loaderTimer = null;
        service.assetLoaderCallback = [];
        service.registerAssetLoaderCallback = function(cb) {
            service.assetLoaderCallback.push(cb);
        };

        $rootScope.$watchCollection('characterSelection', function() {
            $timeout.cancel(service.loaderTimer);
            service.loaderTimer = $timeout(function () {
                angular.forEach(service.assetLoaderCallback, function (cb) {
                    cb();
                });
                $cookies.putObject(
                    'AssetsController_characterSelection',
                    service.characterSelection
                );
            }, 1000);
        });
        $interval(function(){service.loadCharacters(true);}, 7200000); //reload characterIDs every two hours.

        return service;
    }

    return angular.
        module('assetHandlerServices', []).
        factory('AssetHandler', [
            '$rootScope',
            '$interval',
            '$timeout',
            '$cookies',
            'Stationspinner',
            AssetHandler
        ]);
};