module.exports = function () {
    'use strict';

    function LoginController($scope, $cookies, $http, $rootScope, $interval, authService, AccountService) {
        $scope.waitingForSSO = false;
        $scope.scopes = '';

        var authTimer = null;
        var spamCounter = 0;

        $rootScope.$on('event:auth-loginRequired', function() {
            AccountService.obtainAuthToken()
                .success(function (config) {
                    $scope.clientID = config.clientID;
                    $scope.callbackURL = config.callbackURL;
                    $scope.authToken = config.authToken;
                    $scope.scopes = config.scopes;
                })
                .error(function (resp, status) {
                    console.log('Error fetching login config', resp, status);
                    // this can happen if we have a token in our headers,
                    // but it is invalid. We clear it, then retry.
                    $http.post('/api/accounting/logout/');
                    delete $http.defaults.headers.common['Authorization'];
                    $cookies.remove('authtoken');
                    $scope.errorMsg = resp.data;
                    $interval.cancel(authTimer);
                });
        });
        $scope.userDoesntHateCookies = $cookies.get('userDoesntHateCookies', false);
        $scope.iLikeCookies = function () {
            $scope.userDoesntHateCookies = true;
            $cookies.put('userDoesntHateCookies', true);
        };

        $scope.startPolling = function () {
            if(authTimer) $interval.cancel(authTimer);
            spamCounter = 0;
            $scope.waitingForSSO = true;
            authTimer = $interval($scope.checkLogin, 3000);
        };

        $scope.doLogin = function (response) {
            console.log('Authentication successful', response.token);
            $interval.cancel(authTimer);
            $scope.waitingForSSO = false;
            AccountService.tokenExpires = new Date(response.expires * 1000);
            AccountService.startRefreshTimer();
            $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
            $cookies.putObject('authtoken', response);
            authService.loginConfirmed(response, function (config) {
                config.headers["Authorization"] = 'Token ' + response.token;
                $rootScope.$emit('loggedIn');
                return config;
            });
        };

        $scope.checkLogin = function () {
            AccountService.checkAuthToken($scope.authToken)
                .success(function (response) {
                    if(response.token && response.token !== null) {
                        $scope.doLogin(response)
                    } else if (response.waiting) {
                        if(spamCounter > 20*30) {
                            console.log('Gave up on the sso auth...');
                            $interval.cancel(authTimer);
                        } else {
                            console.log('Waiting for sso...');
                            spamCounter++;
                        }
                    } else {
                        $interval.cancel(authTimer);
                    }
                })
                .error(function (resp, status) {
                    $scope.errorMsg = 'Wrong username or password.';
                    $scope.waitingForSSO = false;
                    $interval.cancel(authTimer);
                });
        };
    }

    return angular.module('loginControllers', []).controller('LoginController', [
        '$scope',
        '$cookies',
        '$http',
        '$rootScope',
        '$interval',
        'authService',
        'AccountService',
        LoginController
    ]);
};