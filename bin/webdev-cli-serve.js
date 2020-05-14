#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
commander_1.default
    .option('--type [typeName]', 'type: dev && build')
    .parse(process.argv);
var type = commander_1.default.type;
if (type == 'dev') {
    console.log('do something rn', type);
}
else if (type == 'build') {
    console.log('do something rn', type);
}
else {
    console.log('params error');
    commander_1.default.help();
}
