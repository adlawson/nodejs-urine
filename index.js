'use strict';

var split = require('split');

module.exports = urine;

// urine :: Stream, Stream, Object -> Undefined
function urine(strIn, strOut, options) {
    var opts = getOptions(options);
    var piped = strIn.pipe(split(opts.pattern));

    piped.on('data', function onStdin(chunk) {
        if (shouldSample(opts.probability)) {
            strOut.write(chunk + "\n");
        }
    });
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

// shouldSample :: Float|Integer -> Boolean
function shouldSample(probability) {
    return 1 === probability || Math.random() < probability;
}
