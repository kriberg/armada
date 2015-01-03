
(function () {
    'use strict';

    function Stationspinner(djResource) {
        var service = {};

        /* accounting services */

        service.Capsuler = djResource('/accounting/capsuler/');
        service.APIKey = djResource('/accounting/apikeys/:id/', {id: '@id'});
        service.MissingTraining = djResource('/accounting/missing-training/');

        /* char services */

        service.CharacterSheet = djResource('/char/CharacterSheet/:characterID/', {characterID: '@characterID'});
        service.Notifications = djResource('/char/Notifications/');
        service.SkillInTraining = djResource('/char/SkillInTraining/:characterID/', {characterID: '@characterID'});
        service.MailMessage = djResource('/char/MailMessage/:messageID/', {messageID: '@messageID'});

        /* corp services */

        service.CorporationSheet = djResource('/corp/CorporationSheet/:corporationID/', {corporationID: '@corporationID'});

        return service;
    }

    angular.
        module('stationspinnerServices', []).
        factory('Stationspinner', ['djResource', Stationspinner]);
}());