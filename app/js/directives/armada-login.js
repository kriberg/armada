module.exports = function () {
    'use strict';

    function ArmadaLogin () {
        return {
            restrict: 'C',
            link: function(scope, elem, attrs) {
                elem.removeClass('waiting-for-angular');

                var login = elem.find('#login-holder');
                var main = elem.find('#content');

                login.hide();

                scope.$on('event:auth-loginRequired', function() {
                    login.slideDown('slow', function() {
                        main.hide();
                    });
                });
                scope.$on('event:auth-loginConfirmed', function() {
                    main.show();
                    login.slideUp();
                });
            }
        };
    }

    return angular
        .module('armadaApp')
        .directive('armadaLogin', ArmadaLogin);
};