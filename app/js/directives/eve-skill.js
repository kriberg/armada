module.exports = function () {
    'use strict';

    function EveSkill () {
        return {
            restrict: 'EA',
            scope: {
                skill: '=skill'
            },
            templateUrl: 'partials/directives/eve-skill.html'
        };
    }

    angular
        .module('armadaApp')
        .directive('eveSkill', EveSkill);
};