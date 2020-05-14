#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var spawn_1 = require("../lib/spawn");
commander_1.default
    .description("部署服务cd-express,需要安装cd-express -g")
    .action(function () {
    spawn_1.promises.spawn("cd-express", process.argv.slice(2));
});
commander_1.default.parse(process.argv);
