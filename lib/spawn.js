"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var colors_1 = __importDefault(require("colors"));
var pkg = require("../package.json");
var rev_spawn = function (command, args, options) {
    if (options === void 0) { options = {}; }
    options.shell = true;
    options.stdio = 'inherit';
    return child_process_1.spawn(command, args, options);
};
var promises_span = function (command, args, options) {
    if (options === void 0) { options = {}; }
    var h = rev_spawn(command, args, options);
    console.log(colors_1.default.green("[" + pkg.name + " spawn] " + command + " " + args.join(" ")));
    return new Promise(function (resolve, reject) {
        h.stderr && h.stderr.on('data', function (data) {
            throw data;
        });
        h.on('error', function (code) {
            throw code;
        });
        h.on('close', function (error) {
            if (error) {
                console.log(colors_1.default.red("[" + pkg.name + " spawn] fail"));
                reject(); //"命令执行失败"
            }
            else {
                //console.log(`执行完毕`);
                console.log(colors_1.default.green("[" + pkg.name + " spawn] success"));
                resolve();
            }
        });
    });
};
exports.spawn = rev_spawn;
var promises;
(function (promises) {
    promises.spawn = promises_span;
})(promises = exports.promises || (exports.promises = {}));
