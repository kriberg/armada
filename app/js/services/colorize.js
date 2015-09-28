module.exports = function () {
    'use strict';

    function Colorize() {
        var COLORS = ["#F489F7", "#52D607", "#EE2D0F", "#24392D", "#E9B16F", "#20B0FF",
            "#2FCF98", "#8E264A", "#373A77", "#C09CB5", "#698D12", "#863F10", "#970183",
            "#2886A0", "#6B88FF", "#D4B21D", "#E043F8", "#F26F6C", "#A5BB7B", "#FD40A5",
            "#276F44", "#73C8BD", "#894EC3", "#FC204B", "#E575A6", "#EB932D", "#745E0D",
            "#126BBC", "#3F2F41", "#214C01", "#97B3D8", "#189346", "#D78F8E", "#AA1A01",
            "#B41C6F", "#E89DE3", "#52431B", "#F6895B", "#073949", "#8C2725", "#C0B55B",
            "#1C7070", "#BC1031", "#95A5FF", "#98B305", "#958A1C", "#75C16E", "#EC4FDE",
            "#64222E", "#276CA1", "#268215", "#AA7EF2", "#4CCC3E", "#543531", "#A736B1",
            "#E89C79", "#F6508E", "#C06506", "#68C0D2", "#F79EBC", "#4758B5", "#5B3C8D",
            "#1E3A17", "#B74EEA", "#B92A49", "#8C5CE7", "#8A0F6A", "#792286", "#0F4B82",
            "#F54C57", "#9AB53A", "#205B4E", "#B44309", "#3E4E14", "#C11687", "#F76C8F",
            "#81510F", "#B9AFDB", "#2A6A7D", "#24335F", "#F086D7", "#BF7A04", "#FC9951",
            "#E8AB26", "#CD96C2", "#8F1F5E", "#F86178", "#4C9002", "#C1B91F", "#B56FF3",
            "#603497", "#D27BF2", "#7B2813", "#7CBBDC", "#95BD85", "#85C5B1", "#277DCC",
            "#46A5EE", "#3F8713", "#9867EC"];


        var service = {};

        service.identity = function(identity) {
            return COLORS[identity % COLORS.length];
        };

        return service;
    }

    return angular.
        module('colorizeServices', []).
        factory('Colorize', [Colorize]);
};