'use strict';

var urine = require('./index.js');
var assert = require('chai').assert;
var sinon = require('sinon');
var stream = require('stream');

suite('urine:', function () {
    var nativeRand, opts, strIn, strOut, strOutWrite, strPipe;

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
        strIn = new stream.Writable();
        strOut = new stream.Writable();
        strPipe = new stream.Writable();

        sinon.stub(strIn, 'pipe', function () {
            return strPipe;
        });

        sinon.stub(strOut, 'write', function () {
            return strOut;
        });

        sinon.stub(strPipe, 'on', function (type, fn) {
            strOutWrite = fn;
            return strPipe;
        });
    });

    teardown(function () {
        restoreMathRand();
    });

    test('`urine` is a function', function () {
        assert.isFunction(urine);
    });

    test('`urine(strIn, strOut)` calls `strIn.pipe()`', function () {
        urine(strIn, strOut);

        assert.isTrue(strIn.pipe.calledOnce);
    });

    test('`urine(strIn, strOut)` calls `strPipe.on()`', function () {
        urine(strIn, strOut);

        assert.isTrue(strPipe.on.calledOnce);
        assert.isTrue(strPipe.on.calledWith('data'));
    });

    suite('probability `1`:', function () {
        setup(function () {
            opts = {
                probability: 1
            };
        });

        test('`urine(strIn, strOut, opts)` calls `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.isTrue(strOut.write.calledOnce);
            assert.isTrue(strOut.write.calledWith(data + "\n"));
        });

        test('`urine(strIn, strOut, opts)` calls `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.isTrue(strOut.write.calledOnce);
            assert.isTrue(strOut.write.calledWith(data + "\n"));
        });
    });

    suite('probability `0.75`:', function () {
        setup(function () {
            opts = {
                probability: .75
            };
        });

        test('`urine(strIn, strOut, opts)` calls `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.isTrue(strOut.write.calledOnce);
            assert.isTrue(strOut.write.calledWith(data + "\n"));
        });

        test('`urine(strIn, strOut, opts)` calls `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.isTrue(strOut.write.calledOnce);
            assert.isTrue(strOut.write.calledWith(data + "\n"));
        });
    });

    suite('probability `0.5`:', function () {
        setup(function () {
            opts = {
                probability: .5
            };
        });

        test('`urine(strIn, strOut, opts)` calls `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.isTrue(strOut.write.calledOnce);
            assert.isTrue(strOut.write.calledWith(data + "\n"));
        });

        test('`urine(strIn, strOut, opts)` doesn\'t call `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.equal(strOut.write.callCount, 0);
        });
    });

    suite('probability `0.25`:', function () {
        setup(function () {
            opts = {
                probability: .25
            };
        });

        test('`urine(strIn, strOut, opts)` calls `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.isTrue(strOut.write.calledOnce);
            assert.isTrue(strOut.write.calledWith(data + "\n"));
        });

        test('`urine(strIn, strOut, opts)` doesn\'t call `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.equal(strOut.write.callCount, 0);
        });
    });

    suite('probability `0`:', function () {
        setup(function () {
            opts = {
                probability: 0
            };
        });

        test('`urine(strIn, strOut, opts)` doesn\'t call `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting1234() {
                return 0.1234;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.equal(strOut.write.callCount, 0);
        });

        test('`urine(strIn, strOut, opts)` doesn\'t call `strOut.write()`', function () {
            var data = 'foo';

            monkeyPatchMathRand(function mathRandForUrineTesting6789() {
                return 0.6789;
            });

            urine(strIn, strOut, opts);
            strOutWrite(data);

            assert.equal(strOut.write.callCount, 0);
        });
    });
});
