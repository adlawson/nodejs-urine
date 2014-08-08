'use strict';

var urine = require('./index.js');
var assert = require('chai').assert;
var sinon = require('sinon');
var stream = require('stream');

suite('urine:', function () {
    var nativeRand, opts, strIn, strOut, strOutSpy;

    // monkeyPatchMathRand :: Function -> Undefined
    function monkeyPatchMathRand(fn) {
        nativeRand = Math.random;
        sinon.stub(Math, 'random', fn); // Please forive me :'(
    }

    // restoreMathRand :: -> Undefined
    function restoreMathRand() {
        if (void(0) !== nativeRand) {
            Math.random = nativeRand; // Put it back before anyone notices!
            nativeRand = void(0);
        }
    }

    setup(function () {
        strIn = new stream.PassThrough();
        strOut = new stream.PassThrough();
    });

    teardown(function () {
        restoreMathRand();
    });

    test('`urine` is a function', function () {
        assert.isFunction(urine);
    });

    suite('pipes:', function () {
        var strSplit, strTransform;

        setup(function () {
            strSplit = new stream.PassThrough();
            strTransform = new stream.PassThrough();

            sinon.stub(strIn, 'pipe', function () {
                return strSplit;
            });
            sinon.stub(strSplit, 'pipe', function () {
                return strTransform;
            });

            strTransform.pipe = sinon.spy();
        });

        test('`urine(strIn, strOut)` calls `strIn.pipe()`', function () {
            urine(strIn, strOut);

            assert.isTrue(strIn.pipe.calledOnce);
            assert.isObject(strIn.pipe.args[0][0]);
        });

        test('`urine(strIn, strOut)` calls `strSplit.pipe()`', function () {
            urine(strIn, strOut);

            assert.isTrue(strSplit.pipe.calledOnce);
            assert.isObject(strSplit.pipe.args[0][0]);
        });

        test('`urine(strIn, strOut)` calls `strTransform.pipe()`', function () {
            urine(strIn, strOut);

            assert.isTrue(strTransform.pipe.calledOnce);
            assert.isObject(strTransform.pipe.args[0][0]);
        });

    });

    suite('probability `1`:', function () {
        setup(function () {
            strIn.resume();
            strOut.resume();
            opts = {
                probability: 1
            };
        });

        test('`urine(strIn, strOut, opts)` pipes to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 1);
            assert.equal(piped, data);
        });

        test('`urine(strIn, strOut, opts)` pipes to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 1);
            assert.equal(piped, data);
        });
    });

    suite('probability `0.75`:', function () {
        setup(function () {
            strIn.resume();
            strOut.resume();
            opts = {
                probability: .75
            };
        });

        test('`urine(strIn, strOut, opts)` pipes to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 1);
            assert.equal(piped, data);
        });

        test('`urine(strIn, strOut, opts)` pipes to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 1);
            assert.equal(piped, data);
        });
    });

    suite('probability `0.5`:', function () {
        setup(function () {
            strIn.resume();
            strOut.resume();
            opts = {
                probability: .5
            };
        });

        test('`urine(strIn, strOut, opts)` pipes to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 1);
            assert.equal(piped, data);
        });

        test('`urine(strIn, strOut, opts)` doesn\'t pipe to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 0);
            assert.equal(piped, '');
        });
    });

    suite('probability `0.25`:', function () {
        setup(function () {
            strIn.resume();
            strOut.resume();
            opts = {
                probability: .25
            };
        });

        test('`urine(strIn, strOut, opts)` pipes to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 1);
            assert.equal(piped, data);
        });

        test('`urine(strIn, strOut, opts)` doesn\'t pipe to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 0);
            assert.equal(piped, '');
        });
    });

    suite('probability `0`:', function () {
        setup(function () {
            strIn.resume();
            strOut.resume();
            opts = {
                probability: 0
            };
        });

        test('`urine(strIn, strOut, opts)` doesn\'t pipe to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 0);
            assert.equal(piped, '');
        });

        test('`urine(strIn, strOut, opts)` doesn\'t pipe to `strOut`', function () {
            var data = "foo\n";
            var count = 0;
            var piped = '';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            strOut.pipe(through(function (chunk, enc, done) {
                count += 1;
                piped += chunk;
                done(null, chunk);
            }));

            urine(strIn, strOut, opts);
            strIn.push(data);

            assert.equal(count, 0);
            assert.equal(piped, '');
        });
    });
});
