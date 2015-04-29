
(function () {
    'use strict';

    function Stationspinner($resource, $http) {
        var service = {};

        /* accounting services */

        service.Capsuler = $resource('/api/accounting/capsuler/');
        service.APIKey = $resource('/api/accounting/apikeys/:id/', {id: '@id'});
        service.MissingTraining = $resource('/api/accounting/missing-training/');

        /* char services */

        service.CharacterSheet = $resource('/api/char/CharacterSheet/:characterID/', {characterID: '@characterID'});
        service.Notifications = $resource('/api/char/Notifications/');
        service.SkillInTraining = $resource('/api/char/SkillInTraining/:characterID/', {characterID: '@characterID'});
        service.DistinctCorporations = $resource('/api/char/DistinctCorporations/');
        service.DistinctAlliances = $resource('/api/char/DistinctAlliances/');

        /* corp services */

        service.CorporationSheet = $resource('/api/corp/CorporationSheet/:corporationID/', {corporationID: '@corporationID'});

        /* evemail services */

        service.Mail = $resource('/api/evemail/Mail/:messageID/', {messageID: '@messageID'});
        service.SearchLanguages = $resource('/api/evemail/Languages/');

        /* economist services */

        service.CharacterWallet = $resource('/api/economist/CharacterWallet/');

        return service;
    }

    angular.
        module('stationspinnerServices', []).
        factory('Stationspinner', ['$resource', '$http', Stationspinner]);
}());
