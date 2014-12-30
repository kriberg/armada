(function () {
    'use strict';

    function LoginController($scope,
                             $cookieStore,
                             $http,
                             $rootScope,
                             $location,
                             authService) {
        angular.element("html").addClass('login-pf');

        if($cookieStore.get('username')) {
            $scope.username = $cookieStore.get('username');
        }
        $scope.submit = function () {
            var user_data = {
                "username": $scope.username,
                "password": $scope.password
            };
            if($scope.rememberUsername) {
                $cookieStore.put('username', $scope.username);
            }
            $http.post("/auth/", user_data)
                .success(function (response) {
                    $cookieStore.put('djangotoken', response.token);
                    $http.defaults.headers.common['Authorization'] = 'Token ' + response.token;
                    $rootScope.loggedInUser = true;
                    $rootScope.$emit('loggedIn');
                    authService.loginConfirmed();
                    angular.element("html").removeClass('login-pf');
                    $location.path('/');
                });
        };

        $scope.link = function($event) {
            console.log($event);
        }
    }

    angular.
        module('loginControllers', []).
        controller('LoginController', [
            '$scope',
            '$cookieStore',
            '$http',
            '$rootScope',
            '$location',
            'authService',
            LoginController
        ]);
}());