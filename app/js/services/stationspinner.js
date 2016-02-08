module.exports = function () {
    'use strict';

    function Stationspinner($resource) {
        var service = {};

        /* accounting services */
        service.Capsuler = $resource('/api/accounting/capsuler/:username/', {username: '@username'});
        service.APIKey = $resource('/api/accounting/apikeys/:id/', {id: '@id'}, {
            'revalidate': {method: 'POST', url: '/api/accounting/revalidate-key/', params: {id: '@id'}}
        });
        service.MissingTraining = $resource('/api/accounting/missing-training/');

        /* char services */

        service.CharacterSheet = $resource('/api/char/CharacterSheet/:characterID/', {characterID: '@characterID'});
        service.Notifications = $resource('/api/char/Notifications/', {}, {
            'query': {method: 'GET', isArray: false}});
        service.SkillInTraining = $resource('/api/char/SkillInTraining/:characterID/', {characterID: '@characterID'});
        service.DistinctCorporations = $resource('/api/char/DistinctCorporations/');
        service.DistinctAlliances = $resource('/api/char/DistinctAlliances/');
        service.WalletTransactions = $resource('/api/char/WalletTransactions/', {}, {
            'query': {method: 'GET', isArray: false}});
        service.AssetLocations = $resource('/api/char/AssetLocations/');
        service.Assets = $resource('/api/char/Assets/', {}, {
            'search': {
                method: 'POST',
                isArray: true,
                url: '/api/char/AssetSearch/'
            },
            'summary': {
                method: 'POST',
                isArray: true,
                url: '/api/statistics/CharacterAssetSummary/'
            }
        });

        /* corp services */

        service.CorporationSheet = $resource('/api/corp/CorporationSheet/:corporationID/', {corporationID: '@corporationID'});

        /* evemail services */

        service.Mail = $resource('/api/evemail/Mail/:messageID/', {messageID: '@messageID'});
        service.SearchLanguages = $resource('/api/evemail/Languages/');

        /* sde services */

        service.InvType = $resource('/api/sde/InvType/:typeID/', {typeID: '@typeID'});

        /* statistics */
        service.CharacterAssetWorth = $resource('/api/statistics/CharacterAssetWorth/', {}, {
            'summary': {
                method: 'POST',
                isArray: true
            }
        });

        return service;
    }

    return angular.
        module('stationspinnerServices', []).
        factory('Stationspinner', ['$resource', Stationspinner]);
};
