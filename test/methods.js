const { assert } = require("chai");
const DateTime = require("../index.js");


describe(`DateTime`, () => {
    describe(`.constructor()`, () => {
        it(`should create new DateTime`, () => {
            const dateTime = new DateTime;

            assert.isTrue(dateTime instanceof DateTime);
        });

        it(`should create new DateTime by timestamp`, () => {
            const timestamp = 10000;
            const dateTime = new DateTime(timestamp);

            assert.equal(dateTime.timestamp, timestamp);
        });

        it(`should check timestamp is 0 if no arguments`, () => {
            const dateTime = new DateTime;

            assert.equal(dateTime.timestamp, 0);
        });

        it(`should throw an exception if argument not a number`, () => {
            assert.throws(() => { new DateTime("10") }, TypeError);
        });

        it(`should prevent timestamp changing`, () => {
            const timestamp = 10000;
            const dateTime = new DateTime(timestamp);

            dateTime.timestamp = 0;

            assert.equal(dateTime.timestamp, timestamp);
        });
    });


    describe(`.valueOf()`, () => {
        it(`should check .valueOf() returns a timestamp`, () => {
            const timestamp = 10000;
            const dateTime = new DateTime(timestamp);

            const value = dateTime.valueOf();

            assert.equal(value, timestamp);
        });
    });


    describe(`.toString()`, () => {
        it(`should check .toString() returns correct value`, () => {
            let timestamp = new Date(2007, 8, 3, 12, 35, 45) / 1000;

            assert.equal(new DateTime(timestamp).toString(), "03.09.2007 12:35:45");
        });
    });
});
