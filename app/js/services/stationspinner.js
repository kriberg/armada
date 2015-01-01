
(function () {
    'use strict';

    function Stationspinner($http, djResource) {
        var service = {};

        /* accounting services */

        service.Capsuler = djResource('/accounting/capsuler/');
        service.APIKey = djResource('/accounting/apikey/:id/', {id: '@id'});
        service.KeyUpdates = djResource('/accounting/key-updates/');

        /* char services */

        service.CharacterSheet = djResource('/char/CharacterSheet/:characterID/', {characterID: '@characterID'});
        service.Notifications = djResource('/char/Notifications/');
        service.SkillInTraining = djResource('/char/SkillInTraining/:characterID/', {characterID: '@characterID'});

        /* corp services */

        service.CorporationSheet = djResource('/corp/CorporationSheet/:corporationID/', {corporationID: '@corporationID'});

        return service;
    }

    angular.
        module('stationspinnerServices', []).
        factory('Stationspinner', ['$http', 'djResource', Stationspinner]);
}());