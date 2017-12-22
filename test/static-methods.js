const { assert } = require("chai");
const DateTime = require("../index.js");


describe("DateTime static methods", () => {
    describe(`#fromTimeString`, () => {
        it("should parse full-format time", () => {
            const exceptedTimestamp = 12 * (60 * 60) + 35 * 60 + 45;

            assert.equal(DateTime.fromTimeString("12:35:45").timestamp, exceptedTimestamp);
        });

        it("should parse time without seconds", () => {
            const exceptedTimestamp = 12 * (60 * 60) + 30 * 60;

            assert.equal(DateTime.fromTimeString("12:30").timestamp, exceptedTimestamp);
        });

        it("should throw an exception if not a string", () => {
            assert.throws(() => { DateTime.fromTimeString(new Date) }, TypeError);
        });

        it("should throw an exception in invalid hour", () => {
            assert.throws(() => { DateTime.fromTimeString("24:25:35") }, TypeError);
        });

        it("should throw an exception in invalid minute", () => {
            assert.throws(() => { DateTime.fromTimeString("12:60:35") }, TypeError);
        });

        it("should throw an exception in invalid second", () => {
            assert.throws(() => { DateTime.fromTimeString("12:25:60") }, TypeError);
        });
    });

    describe(`#fromDateString`, () => {
        it("should parse full-format date", () => {
            let excepted = new Date(2007, 2, 12) / 1000;

            assert.equal(DateTime.fromDateString("12.03.2007").timestamp, excepted);
        });

        it("should throw an exception if not a string", () => {
            assert.throws(() => { DateTime.fromDateString(new Date) }, TypeError);
        });

        it("should throw an exception in invalid day", () => {
            assert.throws(() => { DateTime.fromTimeString("30.02.2007") }, TypeError);
        });

        it("should throw an exception in invalid month", () => {
            assert.throws(() => { DateTime.fromTimeString("03.13.2007") }, TypeError);
        });
    });

    describe(`#fromString`, () => {
        it("should parse date and time", () => {
            let excepted = new Date(2007, 8, 3, 12, 30, 15) / 1000;

            assert.equal(DateTime.fromString("03.09.2007 12:30:15").timestamp, excepted);
        });

        it("should throw an exception if not a string", () => {
            assert.throws(() => { DateTime.fromString(new Date) }, TypeError);
        });

        it("should throw an exception if invalid format", () => {
            assert.throws(() => { DateTime.fromString("03.09.22:30:15") }, TypeError);
        });
    });
});
