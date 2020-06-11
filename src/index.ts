
import {promises} from "./lib/spawn";
import fs from "fs";
import path from "path"
import { SpawnOptions } from "child_process";


export function exec(command:string,args:string[],option:SpawnOptions={}):Promise<void>{
    return promises.spawn(command,args,option)
}

export function execs(commands:Array<string[]>,option:SpawnOptions={}){
    let rev = Promise.resolve();
    commands.forEach(item=>rev=rev.then(()=>exec(item[0],item.slice(1),option)))
    return rev;
}

export namespace git {
    export function push(
        message:string="\"from webdev-cli git push\"",
        cwd:string=process.cwd()
    ):Promise<any> {
        console.log(`message:${message} cwd:${cwd}`);
        return execs([
            ["git","add","."],
            ["git","commit","-m",message],
            ["git","push"]
        ])
        .catch(error=>{
            error&&console.error(error);
        });
    }    
}

export namespace npm {
    /**
     * 更新json文件（默认package.json）中 version 根属性(默认最后一位加1)
     *
     * @export
     * @param {string} [version] 版本号
     * @param {string} [pakfilename="package.json"] 文件名
     * @param {string} [cwd=process.cwd()] 工作目录
     * @returns
     */
    export function upversion(version?:string,pakfilename:string="package.json",cwd:string=process.cwd()){
        let pkgpath = path.join(cwd,pakfilename);
        return fs.promises.access(pkgpath)
        .then(state=>{
            delete require.cache[pkgpath];
            let pkg = require(pkgpath);
            if(!version){
                let arr = pkg.version.split(".");
                arr[arr.length-1]=(parseInt(arr[arr.length-1])+1).toString();
                version = arr.join(".");
            }
            pkg.version = version;
            return fs.promises.writeFile(pkgpath,JSON.stringify(pkg,null,2))
        })
    }

    export function publish(
        message:string="\"from webdev-cli auto publish\"",
        version?:string,
        cwd:string=process.cwd()
    ):Promise<any> {
        //console.log(`message:${message} version:${version} cwd:${cwd}`);
        return upversion(version,undefined,cwd)
        .then(()=>git.push(message,cwd))
        .then(()=>execs([
            ["npm","publish"]
        ]))
        .catch(error=>{
            error&&console.error(error);
        });
    }    
}