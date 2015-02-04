(function () {
    'use strict';

    function Configuration($routeProvider, $httpProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $routeProvider.
            when('/', {
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardController'
            }).
            /*when('/characters', {
             templateUrl: 'partials/characters.html',
             controller: 'CharacterList'
             }).*/
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginController'
            }).
            when('/tour', {
                templateUrl: 'partials/tour.html',
                controller: 'TourController'
            }).
            when('/evemail', {
                templateUrl: 'partials/evemail.html',
                controller: 'EVEMailController'
            }).
            when('/apikeys', {
                templateUrl: 'partials/apikeys.html',
                controller: 'APIKeyController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }

    angular
        .module('armadaApp', [
            'http-auth-interceptor',
            'ngRoute',
            'ngCookies',
            'ngSanitize',
            'ui.bootstrap',
            'ngResource',
            'angularUtils.directives.dirPagination',
            'stationspinnerServices',
            'loginControllers',
            'dashboardControllers',
            'navbarControllers',
            'evestatusControllers',
            'mailDisplayControllers',
            'tourControllers',
            'evemailControllers',
            'apikeyControllers'
        ])
        .config(['$routeProvider', '$httpProvider', Configuration])
        .config(function(paginationTemplateProvider) {
            paginationTemplateProvider.setPath('js/directives/dirPagination.tpl.html');
        })
        .filter('shortify', [Shortify])
        .filter('humanify', [Humanify])
        .filter('romanify', [Romanify])
        .run(function($cookieStore, $rootScope, $http, $location) {
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                if ($rootScope.loggedInUser == null) {
                    // User is not logged in, store their destination, then
                    // redirect to login.
                    if (next.templateUrl === "partials/login.html" || next.templateUrl === "partials/tour.html") {
                    } else {
                        $rootScope.destination = next;
                    }
                }
                if(!next.templateUrl === "partials/login.html") {
                    angular.element("html").removeClass("login-pf")
                }
            });
            if($cookieStore.get('djangotoken')) {
                $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
            } else {
                $location.path('/login');
            }

        });
})();
