module.exports = function () {
    'use strict';

    function MailDisplay () {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/mail-display.html',
            scope: {
                mail: '=mail'
            }
        };
    }

    angular
        .module('armadaApp')
        .directive('mailDisplay', MailDisplay);

};