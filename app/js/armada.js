module.exports = function () {
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
                templateUrl: 'partials/character/list.html',
                controller: 'CharacterListController'
            })
            .state('characters.details', {
                url: '/:characterID',
                views: {
                    'content@characters': {
                        templateUrl: 'partials/character/details.html',
                        controller: 'CharacterDetailsController'
                    }
                }
            })
            .state('characters.details.sheet', {
                url: '/sheet',
                views: {
                    'tab@characters.details': {
                        templateUrl: 'partials/character/sheet.html',
                        controller: 'CharacterDetailsSheetController'
                    }
                }
            })
            .state('characters.details.skills', {
                url: '/skills',
                views: {
                    'tab@characters.details': {
                        templateUrl: 'partials/character/skills.html',
                        controller: 'CharacterDetailsSkillsController'
                    }
                }
            })
            .state('characters.details.wallet', {
                url: '/wallet',
                views: {
                    'tab@characters.details': {
                        templateUrl: 'partials/character/economy/view.html'
                    }
                }
            })
            .state('characters.details.wallet.balance', {
                url: '/balance',
                views: {
                    'wallet@characters.details.wallet': {
                        templateUrl: 'partials/character/economy/balance.html',
                        controller: 'CharacterDetailsWalletBalanceController'
                    }
                }
            })
            .state('characters.details.wallet.transactions', {
                url: '/transactions',
                views: {
                    'wallet@characters.details.wallet': {
                        templateUrl: 'partials/character/economy/transactions.html',
                        controller: 'CharacterDetailsWalletTransactionsController'
                    }
                }
            })
            .state('apikeys', {
                url: '/apikeys',
                templateUrl: 'partials/apikeys.html',
                controller: 'APIKeyController'
            })
            .state('assets', {
                url: '/assets',
                templateUrl: '../partials/assets/details.html'
            })
            .state('assets.browsing', {
                url: '/browse',
                views: {
                    'assets@assets': {
                        templateUrl: 'partials/assets/browsing/view.html',
                        controller: 'AssetsBrowsingListController'
                    }
                }
            })
            .state('assets.browsing.locations', {
                url: '/locations',
                views: {
                    'assets_browsing@assets.browsing': {
                        templateUrl: 'partials/assets/browsing/locations/list.html',
                        controller: 'AssetLocationsListController'
                    }
                }

            })
            .state('assets.browsing.locations.list', {
                url: '/:locationIDs',
                views: {
                    'assets_browsing@assets.browsing': {
                        templateUrl: 'partials/assets/browsing/locations/details.html',
                        controller: 'AssetLocationsDetailsController'
                    }
                }

            })
            .state('assets.browsing.inventory', {
                url: '/inventory/:locationID',
                views: {
                    'assets_browsing@assets.browsing': {
                        templateUrl: 'partials/assets/browsing/inventory/list.html',
                        controller: 'AssetInventoryController'
                    }
                }
            })
            .state('assets.browsing.inventory.container', {
                url: '/:containerID',
                views: {
                    'assets_browsing@assets.browsing': {
                        templateUrl: 'partials/assets/browsing/inventory/list.html',
                        controller: 'AssetInventoryController'
                    }
                }
            })
            .state('assets.searching', {
                url: '/search',
                views: {
                    'assets@assets': {
                        templateUrl: '../partials/assets/searching/searching.html',
                        controller: 'AssetsSearchingController'
                    }
                }
            })
        ;

    }

    return angular
        .module('armadaApp', [
            'http-auth-interceptor',
            'ngRoute',
            'ui.router',
            'ngCookies',
            'ngSanitize',
            'ui.bootstrap',
            'ngResource',
            'angular.filter',
            'angularUtils.directives.dirPagination',
            'nya.bootstrap.select',
            'armadaSettingsServices',
            'stationspinnerServices',
            'colorizeServices',
            'loginControllers',
            'dashboardControllers',
            'navbarControllers',
            'eveStatusControllers',
            'tourControllers',
            'evemailControllers',
            'apikeyControllers',
            'characterListControllers',
            'characterDetailsControllers',
            'characterDetailsWalletTransactionsControllers',
            'characterDetailsWalletBalanceControllers',
            'characterDetailsSkillsControllers',
            'characterDetailsSheetControllers',
            'assetsBrowsingControllers',
            'assetLocationsListControllers',
            'assetLocationsDetailsControllers',
            'assetInventoryControllers',
            'assetsSearchingControllers'
        ])
        .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', Configuration])
        .config(function ($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        })
        .config(function (paginationTemplateProvider) {
            paginationTemplateProvider.setPath('js/directives/dirPagination-numberbar.tpl.html');
        })
        .filter('shortify', [FiltersNumbers.Shortify])
        .filter('humanify', [FiltersNumbers.Humanify])
        .filter('romanify', [FiltersNumbers.Romanify])
        .filter('quantify', [FiltersNumbers.Quantify])
        .filter('iskify', [FiltersNumbers.Iskify])
        .filter('eveImage32', [FiltersEveImage.EveImage32])
        .filter('eveImage64', [FiltersEveImage.EveImage64])
        .run(function ($cookieStore, $rootScope, $http, $location) {
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if ($rootScope.loggedInUser == null) {
                    // User is not logged in, store their destination, then
                    // redirect to login.
                    if (next.templateUrl === "partials/login.html" || next.templateUrl === "partials/tour.html") {
                    } else {
                        $rootScope.destination = next;
                    }
                }
                if (!next.templateUrl === "partials/login.html") {
                    angular.element("html").removeClass("login-pf");
                } else {
                }
            });
            if ($cookieStore.get('djangotoken')) {
                $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');
            } else {
                $location.path('/login');
            }

        });
};
