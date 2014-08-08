'use strict';

var split = require('split');
var through = require('through');

module.exports = urine;

// urine :: Stream, Stream, Object -> Undefined
function urine(strIn, strOut, options) {
    var opts = getOptions(options);

    strIn.pipe(getSplitTransform(opts))
         .pipe(getSampleTransform(opts))
         .pipe(strOut);
}

// getOption :: Mixed, Mixed -> Mixed
function getOption(val, def) {
    return void(0) === val ? def : val;
}

// getOptions :: Object -> Object
function getOptions(options) {
    var opts = options || {};
    return {
        pattern: getOption(opts.pattern),
        probability: getOption(opts.probability, 1)
    };
}

// getSampleTransform :: Object -> Stream
function getSampleTransform(opts) {
    return through(function sampleTransform(chunk) {
        if (shouldSample(opts.probability)) {
            this.queue(chunk + "\n");
        }
    });
}

// getSplitTransform :: Object -> Stream
function getSplitTransform(opts) {
    return split(opts.pattern);
}

// shouldSample :: Float|Integer -> Boolean
function shouldSample(probability) {
    return 1 === probability || Math.random() < probability;
}
