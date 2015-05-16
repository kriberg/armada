(function () {
    'use strict';

    function Configuration($stateProvider, $httpProvider, $urlRouterProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardController'
            })
            .state('legal', {
                url: '/legal',
                templateUrl: 'partials/legal.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'LoginController'
            })
            .state('tour', {
                url: '/tour',
                templateUrl: 'partials/tour.html',
                controller: 'TourController'
            })
            .state('evemail', {
                url: '/evemail',
                templateUrl: 'partials/evemail.html',
                controller: 'EVEMailController'
            })
            .state('characters', {
                url: '/characters',
                templateUrl: 'partials/character_list.html',
                controller: 'CharacterListController'
            })
            .state('characters.details', {
                url: '/:characterID',
                views: {
                    'content@characters': {
                        templateUrl: 'partials/character_details.html',
                        controller: 'CharacterDetailsController'
                    }
                }
            })
            .state('characters.details.sheet', {
                url: '/sheet',
                views: {
                    'tab@characters.details': {
                        templateUrl: 'partials/character_details_sheet.html',
                        controller: 'CharacterDetailsSheetController'
                    }
                }
            })
            .state('characters.details.skills', {
                url: '/skills',
                views: {
                    'tab@characters.details': {
                        templateUrl: 'partials/character_details_skills.html',
                        controller: 'CharacterDetailsSkillsController'
                    }
                }
            })
            .state('characters.details.wallet', {
                url: '/wallet',
                views: {
                    'tab@characters.details': {
                        templateUrl: 'partials/character_details_wallet.html'
                    }
                }
            })
            .state('characters.details.wallet.balance', {
                url: '/balance',
                views: {
                    'wallet@characters.details.wallet': {
                        templateUrl: 'partials/character_details_wallet_balance.html',
                        controller: 'CharacterDetailsWalletBalanceController'
                    }
                }
            })
            .state('characters.details.wallet.transactions', {
                url: '/transactions',
                views: {
                    'wallet@characters.details.wallet': {
                        templateUrl: 'partials/character_details_wallet_transactions.html',
                        controller: 'CharacterDetailsWalletTransactionsController'
                    }
                }
            })
            .state('apikeys', {
                url: '/apikeys',
                templateUrl: 'partials/apikeys.html',
                controller: 'APIKeyController'
            });

    }

    angular
        .module('armadaApp', [
            'http-auth-interceptor',
            'ngRoute',
            'ui.router',
            'ngCookies',
            'ngSanitize',
            'ui.bootstrap',
            'ngResource',
            'angular.filter',
            'nvd3',
            'angularUtils.directives.dirPagination',
            'stationspinnerServices',
            'loginControllers',
            'dashboardControllers',
            'navbarControllers',
            'evestatusControllers',
            'tourControllers',
            'evemailControllers',
            'apikeyControllers',
            'characterListControllers',
            'characterDetailsControllers',
            'characterDetailsWalletTransactionsControllers',
            'characterDetailsWalletBalanceControllers',
            'characterDetailsSkillsControllers',
            'characterDetailsSheetControllers'
        ])
        .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', Configuration])
        .config(function($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        })
        .config(function(paginationTemplateProvider) {
            paginationTemplateProvider.setPath('js/directives/dirPagination-numberbar.tpl.html');
        })
        .filter('shortify', [Shortify])
        .filter('humanify', [Humanify])
        .filter('romanify', [Romanify])
        .filter('iskify', [Iskify])
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
                    angular.element("html").removeClass("login-pf");
                } else {
                }
            });
            if($cookieStore.get('djangotoken')) {
                $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
            } else {
                $location.path('/login');
            }

        });
})();
