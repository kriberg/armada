module.exports = function () {
    'use strict';

    function EveIcons() {
        var service = {};

        service.getIconURL = function(typeID, iconSize) {
            return "https://imageserver.eveonline.com/Type/" + typeID + "_" + iconSize + ".png";
        };

        service.getShipURL = function(typeID, iconSize) {
            return "https://imageserver.eveonline.com/Render/" + typeID + "_" + iconSize + ".png";
        };

        return service;
    }

    return angular.
    module('eveIconsServices', []).
    factory('EveIcons', [EveIcons]);
};