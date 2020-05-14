"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var spawn_1 = require("./lib/spawn");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function exec(command, args, option) {
    if (option === void 0) { option = {}; }
    return spawn_1.promises.spawn(command, args, option);
}
exports.exec = exec;
function execs(commands, option) {
    if (option === void 0) { option = {}; }
    var rev = Promise.resolve();
    commands.forEach(function (item) { return rev = rev.then(function () { return exec(item[0], item.slice(1), option); }); });
    return rev;
}
exports.execs = execs;
var git;
(function (git) {
    function push(message, cwd) {
        if (message === void 0) { message = "\"from webdev-cli git push\""; }
        if (cwd === void 0) { cwd = process.cwd(); }
        //console.log(`message:${message} cwd:${cwd}`);
        return execs([
            ["git", "add", "."],
            ["git", "commit", "-m", message],
            ["git", "push"]
        ])
            .catch(function (error) {
            error && console.error(error);
        });
    }
    git.push = push;
})(git = exports.git || (exports.git = {}));
var npm;
(function (npm) {
    /**
     * 更新json文件（默认package.json）中 version 根属性(默认最后一位加1)
     *
     * @export
     * @param {string} [version] 版本号
     * @param {string} [pakfilename="package.json"] 文件名
     * @param {string} [cwd=process.cwd()] 工作目录
     * @returns
     */
    function upversion(version, pakfilename, cwd) {
        if (pakfilename === void 0) { pakfilename = "package.json"; }
        if (cwd === void 0) { cwd = process.cwd(); }
        var pkgpath = path_1.default.join(cwd, pakfilename);
        return fs_1.default.promises.access(pkgpath)
            .then(function (state) {
            delete require.cache[pkgpath];
            var pkg = require(pkgpath);
            if (!version) {
                var arr = pkg.version.split(".");
                arr[arr.length - 1] = (parseInt(arr[arr.length - 1]) + 1).toString();
                version = arr.join(".");
            }
            pkg.version = version;
            return fs_1.default.promises.writeFile(pkgpath, JSON.stringify(pkg, null, 2));
        });
    }
    npm.upversion = upversion;
    function publish(message, version, cwd) {
        if (message === void 0) { message = "\"from webdev-cli auto publish\""; }
        if (cwd === void 0) { cwd = process.cwd(); }
        //console.log(`message:${message} version:${version} cwd:${cwd}`);
        return upversion(version, undefined, cwd)
            .then(function () { return git.push(message, cwd); })
            .then(function () { return execs([
            ["npm", "publish"]
        ]); })
            .catch(function (error) {
            error && console.error(error);
        });
    }
    npm.publish = publish;
})(npm = exports.npm || (exports.npm = {}));
