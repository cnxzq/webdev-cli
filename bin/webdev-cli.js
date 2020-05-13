#!/usr/bin/env node
const cwd = process.cwd();
const arg = require("arg")
const pkg = require("../package.json")

const args = arg({
    // Types
    '--help':    Boolean,
    '--debug':    Boolean,
    '--version': Boolean,
    '--open': Boolean,
    '--verbose': arg.COUNT,   // Counts the number of times --verbose is passed
    '--port':    Number,      // --port <number> or --port=<number>
    // Aliases
    '-p':        '--port',
    '-v':        '--version',
    '-h':        '--help',
    '-o':        '--open',
});
console.log("work dir:"+cwd)
console.log("paramers:")
debug(args);