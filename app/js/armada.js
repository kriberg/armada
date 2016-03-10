module.exports = function () {
    'use strict';

    function Configuration($stateProvider, $httpProvider, $urlRouterProvider) {
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('dashboard', {
                url: '/',
                views: {
                    'top_content': {
                        templateUrl: 'partials/dashboard.html',
                        controller: 'DashboardController'
                    },
                    'login' : {
                        templateUrl: 'partials/login.html',
                        controller: 'LoginController'
                    },
                    'navbar': {
                        templateUrl: 'partials/navbar.html',
                        controller: 'NavbarController'
                    }
                }
            })
            .state('legal', {
                url: '/legal',
                views: {
                    'top_content': {
                        templateUrl: 'partials/legal.html'
                    },
                    'navbar': {
                        templateUrl: 'partials/navbar.html',
                        controller: 'NavbarController'
                    },
                    'login' : {
                        templateUrl: 'partials/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('evemail', {
                url: '/evemail',
                views: {
                    'top_content': {
                        templateUrl: 'partials/evemail.html',
                        controller: 'EVEMailController'
                    },
                    'navbar': {
                        templateUrl: 'partials/navbar.html',
                        controller: 'NavbarController'
                    },
                    'login' : {
                        templateUrl: 'partials/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('characters', {
                url: '/characters',
                views: {
                    'top_content': {
                        templateUrl: 'partials/character/list.html',
                        controller: 'CharacterListController'
                    },
                    'navbar': {
                        templateUrl: 'partials/navbar.html',
                        controller: 'NavbarController'
                    },
                    'login' : {
                        templateUrl: 'partials/login.html',
                        controller: 'LoginController'
                    }
                }

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
                views: {
                    'top_content': {
                        templateUrl: 'partials/apikeys.html',
                        controller: 'APIKeyController'
                    },
                    'navbar': {
                        templateUrl: 'partials/navbar.html',
                        controller: 'NavbarController'
                    },
                    'login' : {
                        templateUrl: 'partials/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('assets', {
                url: '/assets',
                views: {
                    'top_content': {
                        templateUrl: 'partials/assets/assets.html',
                        controller: 'AssetsController'
                    },
                    'navbar': {
                        templateUrl: 'partials/navbar.html',
                        controller: 'NavbarController'
                    },
                    'login' : {
                        templateUrl: 'partials/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('assets.summary', {
                url: '/summary',
                views: {
                    'main@assets': {
                        templateUrl: 'partials/assets/summary/summary.html',
                        controller: 'AssetsSummaryController'
                    },
                    'title@assets': {
                        template: 'Current net assets worth'
                    }
                }
            })
            .state('assets.browsing', {
                url: '/browse',
                views: {
                    'main@assets': {
                        templateUrl: 'partials/assets/browsing/view.html',
                        controller: 'AssetsBrowsingController'
                    },
                    'toolbar@assets': {
                        templateUrl: 'partials/assets/browsing/toolbar.html',
                        controller: 'AssetsBrowsingToolbarController'
                    },
                    'title@assets': {
                        template: 'Combined asset browsing'
                    }

                }
            })
            .state('assets.browsing.locations', {
                url: '/locations',
                views: {
                    'assets_browsing@assets.browsing': {
                        templateUrl: 'partials/assets/browsing/locations/list.html',
                        controller: 'AssetsLocationsListController'
                    }
                }

            })
            .state('assets.browsing.location', {
                url: '/location/:locationIDs',
                views: {
                    'assets_browsing@assets.browsing': {
                        templateUrl: 'partials/assets/browsing/locations/details.html',
                        controller: 'AssetsLocationsDetailsController'
                    }
                }
            })
            .state('assets.browsing.inventory', {
                url: '/inventory/:locationID/:containerID',
                reloadOnSearch: false,
                views: {
                    'assets_browsing@assets.browsing': {
                        templateUrl: 'partials/assets/browsing/inventory/list.html',
                        controller: 'AssetsInventoryController'
                    },
                    'toolbar@assets': {
                        templateUrl: 'partials/assets/browsing/inventory/toolbar.html',
                        controller: 'AssetsInventoryToolbarController'
                    }
                }
            })
            .state('assets.searching', {
                url: '/search',
                views: {
                    'main@assets': {
                        templateUrl: 'partials/assets/searching/searching.html',
                        controller: 'AssetsSearchingController'
                    },
                    'toolbar@assets': {
                        templateUrl: 'partials/assets/searching/toolbar.html',
                        controller: 'AssetsSearchingToolbarController'
                    },
                    'title@assets': {
                        template: 'Combined asset searching'
                    }
                }
            })
            .state('assets.searching.query', {
                url: '/:query',
                reloadOnSearch: false,
                views: {
                    'main@assets': {
                        templateUrl: 'partials/assets/searching/searching.html',
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
            'ui.bootstrap.accordion',
            'ui.bootstrap.carousel',
            'ngResource',
            'ngAnimate',
            'ng-fx',
            'angular.filter',
            'angularUtils.directives.dirPagination',
            'nya.bootstrap.select',
            'patternfly',
            'armadaSettingsServices',
            'stationspinnerServices',
            'assetToolbarServices',
            'characterSelectorServices',
            'colorizeServices',
            'accountServices',
            'eveIconsServices',
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
            'assetsControllers',
            'assetsSummaryControllers',
            'assetsBrowsingControllers',
            'assetsBrowsingToolbarControllers',
            'assetsLocationsListControllers',
            'assetsLocationsDetailsControllers',
            'assetsInventoryControllers',
            'assetsInventoryToolbarControllers',
            'assetsSearchingControllers',
            'assetsSearchingToolbarControllers'
        ])
        .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', Configuration])
        .config(function ($resourceProvider) {
            $resourceProvider.defaults.stripTrailingSlashes = false;
        })
        .config(function (paginationTemplateProvider) {
            paginationTemplateProvider.setPath('partials/directives/dirPagination-numberbar.tpl.html');
        })
        .filter('shortify', [FiltersNumbers.Shortify])
        .filter('humanify', [FiltersNumbers.Humanify])
        .filter('romanify', [FiltersNumbers.Romanify])
        .filter('quantify', [FiltersNumbers.Quantify])
        .filter('iskify', [FiltersNumbers.Iskify])
        .filter('eveImage32', [FiltersEveImage.EveImage32])
        .filter('eveImage64', [FiltersEveImage.EveImage64])
        .run(function($cookies, $http, AccountService) {
            if(!$http.defaults.headers.common['Authorization']) {
                var authToken = $cookies.getObject('authtoken', null);
                console.log('LE token', authToken);
                if(authToken) {
                    $http.defaults.headers.common['Authorization'] = 'Token ' + authToken.token;
                    AccountService.tokenExpires = authToken.expires * 1000;
                    AccountService.startRefreshTimer();
                }
            }
        });
};
