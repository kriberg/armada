module.exports = function () {
    'use strict';

    function APIKeyController($scope, $interval, $timeout, $log, Stationspinner) {
        $scope.apikeys = Stationspinner.APIKey.query();
        $scope.newKey = new Stationspinner.APIKey();
        $scope.messages = [];

        $scope.deleteKey = function (key) {
            key.$delete();
            $scope.apikeys = Stationspinner.APIKey.query();
        };

        $scope.revalidateKey = function(key) {
            $log.debug('Revalidating key: ', key);
            Stationspinner.APIKey.revalidate({id: key.id}).$promise
                .then(function (data) {
                    $log.debug('Revalidated key: ', data);
                    $scope.messages.push({class: 'text-info', text: data.msg});
                    $timeout($scope.refresh, 15000);
                }, function (error) {
                    $scope.messages.push({class: 'text-danger', text: error.data.msg});
                });
        };

        $scope.saveKey = function (key) {
            key.$save();
            if(!key.id) {
                $scope.newKey = new Stationspinner.APIKey();
                $scope.messages.push({class: 'text-info', text: 'New key added. It will be parsed as soon as possible.'})
            } else{
                $scope.messages.push({class: 'text-info', text: 'Key updates. It will be reparsed as soon as possible.'})
            }
            $timeout($scope.refresh, 15000);
        };

        $scope.refresh = function () {
            $scope.apikeys = Stationspinner.APIKey.query();
            $scope.messages.length = 0;
        };

        $interval($scope.refresh, 180000);

    }

    angular.
        module('apikeyControllers', []).
        controller('APIKeyController', [
        '$scope',
        '$interval',
        '$timeout',
        '$log',
        'Stationspinner',
        APIKeyController
    ]);
};