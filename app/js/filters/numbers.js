function Shortify() {
    "use strict";
    return function (value) {
        var digits = String(value).split('.')[0];


        if(digits.length > 6 && digits.length < 10) {
            return $.number(parseFloat(value)/1000000, 2, '.', ',') + "m";
        } else if(digits.length > 10) {
            return $.number(parseFloat(value)/1000000000, 2, '.', ',') + "b";
        } else {
            // less than a million, slap on a k!
            return $.number(parseFloat(value)/1000, 2, '.', ',') + "k";
        }
    }
}

function Humanify() {
    return function (value) {
        return $.number(parseFloat(value), 0, '.', ',');
    }
}

function Iskify() {
    "use strict";
    return function (value) {
        return $.number(parseFloat(value), 2, '.', ',');
    }
}

function Romanify() {
    "use strict";
    return function (value) {
        if(value <= 5 && value > 0) {
            switch(value) {
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
        }
    }
}