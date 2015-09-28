module.exports = function () {
    'use strict';

    function AssetsSearchingController($scope, $interval, $timeout, $cookies, Stationspinner, Colorize) {
        $scope.characterSelection = [];
        $scope.availableCharacters = [];

        $scope.searchAssets = function () {
            Stationspinner.Assets.search({
                query: $scope.searchText,
                characterIDs: $scope.characterSelection.join(',')
            }).$promise.then(function (assets) {
                console.log(assets);
                $scope.assets = assets;
            });
        };

        $scope.loadCharacters = function (skipCookieLoading) {
            Stationspinner.CharacterSheet.query({short: true}).$promise.then(function (availableCharacters) {
                $scope.availableCharacters = availableCharacters;
                angular.forEach(availableCharacters, function (character) {
                    character['type'] = 'character';
                    character['color'] = Colorize.identity(character['characterID']);
                });
                // After we've loaded the characterIDs, let's see if the user has selected characters
                // previously. If not, just select all.
                if (!skipCookieLoading) {
                    var cookieSelection = $cookies.getObject('AssetsController_characterSelection');
                    if (cookieSelection instanceof Array) {
                        angular.forEach(cookieSelection, function (characterID) {
                            if (angular.element.inArray(characterID, $scope.availableCharacters)) {
                                $scope.characterSelection.push(characterID);
                            }
                        });
                    } else {
                        $scope.characterSelection.length = 0;
                        angular.forEach($scope.availableCharacters, function (character) {
                            $scope.characterSelection.push(character.characterID);
                        });
                    }
                }
            });
        };

        $scope.loadCharacters(false);

        $scope.loaderPromise = null;
        $scope.$watchCollection('characterSelection', function () {
            $timeout.cancel($scope.loaderPromise);
            $scope.loaderPromise = $timeout(function () {
                $cookies.putObject(
                    'AssetsController_characterSelection',
                    $scope.characterSelection
                );
            }, 1000);
        });
        $interval(function () {
            $scope.loadCharacters(true);
        }, 7200000); //reload characterIDs every two hours.
    }

    return angular
        .module('assetsSearchingControllers', [])
        .controller('AssetsSearchingController', [
            '$scope',
            '$interval',
            '$timeout',
            '$cookies',
            'Stationspinner',
            'Colorize',
            AssetsSearchingController]);
};