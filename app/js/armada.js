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
            otherwise({
                redirectTo: '/'
            });
    }

    angular
        .module('armadaApp', [
            'http-auth-interceptor',
            'ngRoute',
            'ngCookies',
            'djangoRESTResources',
            'stationspinnerServices',
            'loginControllers',
            'dashboardControllers',
            'navbarControllers',
            'evestatusControllers',
            'tourControllers',
            'ui.bootstrap'
        ])
        .config(['$routeProvider', '$httpProvider', Configuration])
        .filter('ISK', [ISK])
        .filter('humanifyISK', [HumanifyISK])
        .filter('humanify', [Humanify])
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
            });
            if($cookieStore.get('djangotoken')) {
                $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
            } else {
                $location.path('/login');
            }
        });
})();
