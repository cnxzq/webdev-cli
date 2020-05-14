#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var index_1 = require("../index");
commander_1.default
    .version("0.1");
commander_1.default
    .command('push [messge] [version]')
    .description("自动提交 git")
    .action(function (message, version) {
    index_1.git.push(message, process.cwd());
    //, '修改package.json#version，提交 git && npm'
    //console.log(env);
    //console.log('Message:%s \nVersion %s', options.message, options.version);
});
commander_1.default.parse(process.argv);
