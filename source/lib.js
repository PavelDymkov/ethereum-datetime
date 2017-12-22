const MINUTE =  60;
const HOUR = 60 * 60;

function addZero(number) {
    return number > 9 ? String(number) : `0${number}`;
}

export default {
    secondsFromMinutes(value) {
        return MINUTE * value;
    },

    secondsFromHours(value) {
        return HOUR * value;
    },

    timeArrayToString() {
        return this.map(addZero).join(":");
    },

    dateArrayToString() {
        return this.map(addZero).join(".");
    },

    mapToTimeValues(source, index) {
        if (index > 2) return null;

        let number = parseInt(source, 10);

        if (isNaN(number) || number < 0)
            throw new TypeError("invalid time format");

        if (index == 0) {
            if (number > 23)
                throw new TypeError("invalid time format");

            return number;
        }

        if (index == 1 || index == 2) {
            if (number > 59)
                throw new TypeError("invalid time format");

            return number;
        }
    },

    mapToDateValues(source, index) {
        if (index > 2) return null;

        let number = parseInt(source, 10);

        if (isNaN(number) || number < 0)
            throw new TypeError("invalid date format");

        if (index == 0) {
            if (number > 31)
                throw new TypeError("invalid date format");

            return number;
        }

        if (index == 1) {
            if (number > 12)
                throw new TypeError("invalid date format");

            return number;
        }

        if (index == 2) {
            return number;
        }
    }
};
