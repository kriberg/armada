module.exports = function () {
    'use strict';

    function TourController($scope) {
    }

    return angular.
        module('tourControllers', []).
        controller('TourController', ['$scope', TourController]);
};