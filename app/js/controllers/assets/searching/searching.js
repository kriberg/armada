module.exports = function () {
    'use strict';

    function AssetsSearchingController($scope, $state, $stateParams, $timeout, $rootScope, Stationspinner, CharacterSelector, AssetToolbar) {
        $scope.assets = [];
        $scope.CharacterSelector = CharacterSelector;
        $scope.searching = false;
        AssetToolbar.placeholderText = 'Where did I put...';
        $scope.nothingFound = false;

        $scope.search = function (query, searchActive) {
            $state.go('assets.searching.query', {query: query});
            $scope.searchAssets(query, searchActive);
        };

        $scope.clear = function () {
            $scope.searching = true;
            $scope.assets.length = 0;
            AssetToolbar.searchText = '';
            $state.go('assets.searching');
            $scope.nothingFound = false;
        };

        var searchTimer = null;
        $scope.searchAssets = function (query, searchActive) {

            if(searchTimer) {
                $timeout.cancel(searchTimer);
            } else {
                $scope.searching = true;
                $scope.assets.length = 0;
            }

            searchTimer = $timeout(function () {
                Stationspinner.Assets.search({
                    query: query,
                    characterIDs: CharacterSelector.join_characterIDs()
                }, function (assets) {
                    searchActive = false;
                    angular.copy(assets, $scope.assets);
                    $timeout(function () {
                        $scope.searching = false;
                        if($scope.assets.length > 0) {
                            $scope.nothingFound = false;
                        } else {
                            $scope.nothingFound = true;
                        }
                    }, 400);
                    searchTimer = null;
                }, function (response) {
                    searchActive = false;
                    $scope.searching = false;
                    console.log('Error while searching', response);
                });
            }, 100);
        };

        if ($stateParams.query !== undefined && $stateParams.query !== '') {
            var loader = function () {
                if (CharacterSelector.charactersHasLoaded) {
                    AssetToolbar.searchText = $stateParams.query;
                    AssetToolbar.searchActive = true;
                    $scope.searchAssets($stateParams.query, AssetToolbar.searchActive);
                } else {
                    $timeout(loader, 300);
                }
            };
            $timeout(loader, 300);
        }

        AssetToolbar.setSearchCallback($scope.search);
        AssetToolbar.setClearCallback($scope.clear);


        $scope.$watchCollection('CharacterSelector.characterSelection', function () {
            if(CharacterSelector.characterSelection.length > 0 && CharacterSelector.charactersHasLoaded) {
                if ($stateParams.query !== undefined && $stateParams.query !== '') {
                    AssetToolbar.searchActive = true;
                    $scope.searchAssets(AssetToolbar.searchText, AssetToolbar.searchActive);
                }
            }
        });

        $rootScope.$on('loggedIn', function () {
            $scope.searchAssets($stateParams.query, AssetToolbar.searchActive);
        });


    }

    return angular
        .module('assetsSearchingControllers', [])
        .controller('AssetsSearchingController', [
            '$scope',
            '$state',
            '$stateParams',
            '$timeout',
            '$rootScope',
            'Stationspinner',
            'CharacterSelector',
            'AssetToolbar',
            AssetsSearchingController]);
}
;