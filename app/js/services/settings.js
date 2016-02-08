module.exports = function () {
    'use strict';

    function ArmadaSettings($cookies) {
        var service = {};

        service.put = function(unit, key, val) {
            console.log('Saving setting:', [unit, key].join('_'), val);
            $cookies.putObject([unit, key].join('_'), val);
        };

        service.get = function(unit, key) {
            console.log('Loading setting:', [unit, key].join('_'));
            return $cookies.getObject([unit, key].join('_'));
        };

        return service;
    }

    return angular.
        module('armadaSettingsServices', []).
        factory('ArmadaSettings', ['$cookies', ArmadaSettings]);
};
