module.exports = function () {
    'use strict';

    function ActiveLink(location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                var activate = function () {
                    var section = location.path().split('/')[1];
                    if(attrs.href.substring(2) == section) {
                        element.parent().addClass('active');
                    } else {
                        element.parent().removeClass('active');
                    }
                };
                scope.$on('$locationChangeStart', activate);
                scope.$on('$stateChangeSuccess', activate);
            }
        };
    }

    return angular
        .module('armadaApp')
        .directive('activeLink', ['$location', ActiveLink]);
};