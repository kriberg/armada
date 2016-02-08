module.exports = function () {
    'use strict';

    function AccountService($http, $cookies, $rootScope, $interval, Stationspinner) {
        var service = {};
        service.refreshTimer = null;
        service.tokenExpires = null;

        service.logout = function () {
            $http.post('/api/accounting/logout/');
            $interval.cancel(service.keepLoggedIn);
            delete $http.defaults.headers.common['Authorization'];
            $cookies.remove('authtoken');
            $rootScope.$broadcast('event:auth-loginRequired');
        };

        service.getUser = function() {
            return Stationspinner.Capsuler.get({username: $rootScope.username});
        };

        service.obtainAuthToken = function () {
            return $http.get('/api/accounting/obtaintoken/', {
                ignoreAuthModule: true
            });
        };

        service.checkAuthToken = function (authToken) {
            return $http.get('/api/accounting/checktoken/?authToken='+authToken, {
                ignoreAuthModule: true
            });
        };

        service.refreshAuthToken = function () {
            return $http.get('/api/accounting/refreshtoken/');
        };

        service.keepLoggedIn = function () {
            var refreshTime = service.tokenExpires - (3*60*1000);
            if(refreshTime < Date.now()) {
                service.refreshAuthToken()
                    .success(function (response) {
                        $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
                        service.tokenExpires = response.expires * 1000;
                        $cookies.putObject('authtoken', response);
                    })
                    .error(function (response) {
                        console.log('Failed token refresh');
                        $cookies.remove('authtoken');
                        $interval.cancel(service.refreshTimer);
                        $rootScope.$emit('event:auth-loginRequired');
                    });
            }
        };

        service.startRefreshTimer = function () {
            console.log('Starting refresh timer', service.tokenExpires);
            service.refreshTimer = $interval(service.keepLoggedIn, 60000);
        };

        return service;
    }

    return angular.
    module('accountServices', []).
    factory('AccountService', [
        '$http',
        '$cookies',
        '$rootScope',
        '$interval',
        'Stationspinner',
        AccountService]);
};
