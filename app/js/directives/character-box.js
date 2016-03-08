module.exports = function () {
    'use strict';

    function CharacterBox () {
        return {
            restrict: 'EA',
            scope: {
                character: '=character'
            },
            templateUrl: 'partials/directives/character-box.html'
        };
    }

    angular
        .module('armadaApp')
        .directive('characterBox', CharacterBox);
};