module.exports = {
    EveImage32: function () {
        "use strict";
        return function (typeID) {
            return "https://imageserver.eveonline.com/Type/" + typeID + "_32.png";
        }
    },

    EveImage64: function () {
        "use strict";
        return function (typeID) {
            return "https://imageserver.eveonline.com/Type/" + typeID + "_64.png";
        }
    }
};