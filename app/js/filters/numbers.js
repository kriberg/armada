module.exports = {
    Shortify: function () {
        "use strict";
        return function (value) {
            var digits = String(value).split('.')[0];
            if (digits.length > 6 && digits.length < 10) {
                return $.number(parseFloat(value) / 1000000, 2, '.', ',') + "m";
            } else if (digits.length >= 10) {
                return $.number(parseFloat(value) / 1000000000, 2, '.', ',') + "b";
            } else if (digits.length <= 6) {
                // less than a million, slap on a k!
                return $.number(parseFloat(value) / 1000, 2, '.', ',') + "k";
            } else {
                return $.number(parseFloat(value), 2, '.', ',');
            }
        }
    },

    Humanify: function () {
        return function (value) {
            return $.number(parseFloat(value), 0, '.', ',');
        }
    },

    Iskify: function () {
        "use strict";
        return function (value) {
            return $.number(parseFloat(value), 2, '.', ',');
        }
    },

    Romanify: function () {
        "use strict";
        return function (value) {
            var num = parseInt(value);
            if (num <= 5 && num > 0) {
                switch (num) {
                    case 1:
                        return 'I';
                    case 2:
                        return 'II';
                    case 3:
                        return 'III';
                    case 4:
                        return 'IV';
                    case 5:
                        return 'V';
                }
            } else {
                return value;
            }
        }
    },

    Quantify: function () {
        "use strict";
        return function (value) {
            var digits = String(value).length;

            if (digits >= 6 && digits < 10) {
                return $.number(parseInt(value) / 1000000, 2, '.', ',') + "m";
            } else if (digits >= 10) {
                return $.number(parseInt(value) / 1000000000, 2, '.', ',') + "b";
            } else if (digits > 3 && digits < 6) {
                return $.number(parseInt(value) / 1000, 2, '.', ',') + "k";
            } else {
                return $.number(parseInt(value), 0, '.', ',');
            }
        }
    }
};