#!/usr/bin/env node
'use strict';

var pkg = require('./package.json');
var urine = require('./index.js');

main();

function main() {
    var stream;
    var program = initProgram();
    var opts = {
        pattern: program.split,
        probability: program.probability
    };

    if (process.stdin.isTTY && 0 < program.args.length) {
        stream = streamFile(program);
    } else if (!process.stdin.isTTY) {
        stream = streamStdin(program);
    }

    return stream ? urine(stream, process.stdout, opts) : program.help();
};

// initProgram :: -> Program
function initProgram() {
    var program = require('commander');

    program.option(
        '-p, --probability [number]',
        'probability of sampling chunk',
        parseFloat
    );
    program.option(
        '-s, --split [pattern]',
        'delimiter or regexp used to split stream',
        parsePattern
    );

    program.usage('[options] <file>')
    program.version(pkg.version);
    program.parse(process.argv);

    return program;
}

// parseNumber :: String -> Number
function parseNumber(val) {
    return val * 1;
}

// parsePattern :: String -> Regex|Null
function parsePattern(val) {
    return void(0) === val ? null : new RegExp(val);
}

// streamFile :: Program -> Stream
function streamFile(program) {
    var fs = require('fs');
    var filename = program.args[0];

    return fs.createReadStream(filename);
}

// streamStdin :: Program -> Stream
function streamStdin(program) {
    return process.stdin;
}
