(function () {
    'use strict';

    function CharacterDetailsWalletTransactionsController($scope, $stateParams, $interval, Stationspinner) {
        $scope.character = $scope.$parent.$parent.character ||
                           Stationspinner.CharacterSheet.get({characterID: $stateParams.characterID});
        $scope.transactions = [];
        $scope.transactionsPagination = {
            currentPage: 1,
            itemsPerPage: 50,
            total: 0
        };

        $scope.getTransactionPage = function(pageNumber) {
            Stationspinner.WalletTransactions.query({
                characterID: $stateParams.characterID,
                page: pageNumber
            }, function (data) {
                $scope.transactions = data.results;
                $scope.transactionsPagination.total = data.count;
                $scope.transactionsPagination.currentPage = pageNumber
            });
        };

        $scope.getTransactionPage($scope.transactionsPagination.currentPage);

        $interval(function() {
            $scope.getTransactionPage($scope.transactionsPagination.currentPage);
        }, 60000);
    }

    angular.
        module('characterDetailsWalletTransactionsControllers', []).
        controller('CharacterDetailsWalletTransactionsController', [
            '$scope',
            '$stateParams',
            '$interval',
            'Stationspinner',
            CharacterDetailsWalletTransactionsController]);
}());