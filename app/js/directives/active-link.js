(function () {
    'use strict';

    function ActiveLink(location) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                scope.$on('$locationChangeStart', function () {
                    if(attrs.href.substring(1) == location.path())
                        element.parent().addClass('active');
                    else
                        element.parent().removeClass('active');
                });
            }
        };
    }

    angular
        .module('armadaApp')
        .directive('activeLink', ['$location', ActiveLink]);
}());