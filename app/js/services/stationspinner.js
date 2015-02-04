
(function () {
    'use strict';

    function Stationspinner($resource, $http) {
        var service = {};

        /* accounting services */

        service.Capsuler = $resource('/accounting/capsuler/');
        service.APIKey = $resource('/accounting/apikeys/:id/', {id: '@id'});
        service.MissingTraining = $resource('/accounting/missing-training/');

        /* char services */

        service.CharacterSheet = $resource('/char/CharacterSheet/:characterID/', {characterID: '@characterID'});
        service.Notifications = $resource('/char/Notifications/');
        service.SkillInTraining = $resource('/char/SkillInTraining/:characterID/', {characterID: '@characterID'});
        service.DistinctCorporations = $resource('/char/DistinctCorporations/');
        service.DistinctAlliances = $resource('/char/DistinctAlliances/');

        /* corp services */

        service.CorporationSheet = $resource('/corp/CorporationSheet/:corporationID/', {corporationID: '@corporationID'});

        /* evemail services */

        service.Mail = $resource('/evemail/Mail/:messageID/', {messageID: '@messageID'});
        service.SearchLanguages = $resource('/evemail/Languages/');

        return service;
    }

    angular.
        module('stationspinnerServices', []).
        factory('Stationspinner', ['$resource', '$http', Stationspinner]);
}());