function ISK() {
    return function (value) {
        return $.number(parseFloat(value), 2, '.', ',');
    }
}

function HumanifyISK() {
    return function (value) {
        var digits = value.split('.')[0];


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