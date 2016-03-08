module.exports = function () {
    'use strict';

    function CharacterBoxExtended () {
        return {
            restrict: 'EA',
            scope: {
                character: '=character',
                skill: '=skill'
            },
            templateUrl: 'partials/directives/character-box-extended.html'
        };
    }

    angular
        .module('armadaApp')
        .directive('characterBoxExtended', CharacterBoxExtended);
};