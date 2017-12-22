import lib from "./lib.js";


class DateTime {
    static errors = {
        INVALID_ARGUMENTS: {
            NOT_A_NUMBER: `argument is not a number`,
            NOT_A_STRING: `argument is not a string`
        },
        INVALID_STRING_FORMAT: {
            DATE: `invalid date format`,
            TIME: `invalid time format`,
            DATE_TIME: `invalid format`
        }
    };

    static fromTimeString(source) {
        if (typeof source != "string")
            throw new TypeError(DateTime.errors.INVALID_ARGUMENTS.NOT_A_STRING);

        let [hours, minutes, seconds = 0] = source.split(":").map(lib.mapToTimeValues);

        if (!hours || !minutes)
            throw new TypeError(DateTime.errors.INVALID_STRING_FORMAT.DATE);

        return new DateTime(lib.secondsFromHours(hours) + lib.secondsFromMinutes(minutes) + seconds);
    }

    static fromDateString(source) {
        if (typeof source != "string")
            throw new TypeError(DateTime.errors.INVALID_ARGUMENTS.NOT_A_STRING);

        let batches = source.split(".").map(lib.mapToDateValues);

        if (batches.length < 3)
            throw new TypeError(DateTime.errors.INVALID_STRING_FORMAT.DATE);

        let [day, month, year] = batches;

        let date = new Date(year, month - 1, day);

        if (date.getDate() != day || date.getMonth() != month - 1 || date.getFullYear() != year)
            throw new TypeError(DateTime.errors.INVALID_STRING_FORMAT.DATE);

        return new DateTime(date / 1000);
    }

    static fromString(source) {
        if (typeof source != "string")
            throw new TypeError(DateTime.errors.INVALID_ARGUMENTS.NOT_A_STRING);

        let batches = source.match(/(\d{1,2}\.\d{1,2}\.\d{4})\D+(\d{1,2}:\d{1,2}:\d{1,2}|\d{1,2}:\d{1,2})/);

        if (!batches)
            throw new TypeError(DateTime.errors.INVALID_STRING_FORMAT.DATE_TIME);

        let [, dateSource, timeSource] = batches;

        let date = DateTime.fromDateString(dateSource);
        let time = DateTime.fromTimeString(timeSource);

        return new DateTime(date.timestamp + time.timestamp);
    }


    constructor(timestamp=0) {
        if (typeof timestamp != "number")
            throw new TypeError(DateTime.errors.INVALID_ARGUMENTS.NOT_A_NUMBER);

        Object.defineProperty(this, "timestamp", { value: timestamp });
    }


    getTime() {
        let time = new Date(this.timestamp * 1000);
        let timeArray = [time.getHours(), time.getMinutes(), time.getSeconds()];

        timeArray.toString = lib.timeArrayToString;

        return timeArray;
    }

    getDate() {
        let date = new Date(this.timestamp * 1000);
        let dateArray = [date.getDate(), date.getMonth(), date.getFullYear()];

        dateArray.toString = lib.dateArrayToString;

        return dateArray
    }


    addSeconds(seconds) {
        return new DateTime(this.timestamp + seconds);
    }

    subtractSeconds(seconds) {
        return new DateTime(this.timestamp - seconds);
    }

    addMinutes(minutes) {
        return this.addSeconds(minutes * 60);
    }

    subtractMinutes(minutes) {
        return this.subtractSeconds(minutes * 60);
    }

    addHours(hours) {
        return this.addMinutes(hours * 60);
    }

    subtractHours(hours) {
        return this.subtractMinutes(hours * 60);
    }

    addDays(days) {
        return this.addHours(days * 24);
    }

    subtractDays(days) {
        return this.subtractHours(days * 24);
    }

    addWeeks(weeks) {
        return this.addDays(weeks * 7);
    }

    subtractWeeks(weeks) {
        return this.subtractDays(weeks * 7);
    }

    addYears(years) {
        let date = new Date(this.timestamp * 1000);

        date.setFullYear(date.getFullYear() + years);

        return new DateTime(date.valueOf() / 1000);
    }

    subtractYears(years) {
        return this.addYears(-years);
    }


    valueOf() {
        return this.timestamp;
    }

    toString() {
        return `${this.getTime().toString()} ${this.getDate().toString()}`
    }
}

module.exports = DateTime;
