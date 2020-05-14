import {spawn as spawn2, SpawnOptions, ChildProcess} from "child_process";
import colors from "colors"
const pkg = require("../package.json");

const rev_spawn = (command:string, args: readonly string[], options: SpawnOptions = {}):ChildProcess=>{
    options.shell = true;
    options.stdio = 'inherit'
    return spawn2(command,args,options);
}
const promises_span = (command:string, args: readonly string[], options: SpawnOptions = {}):Promise<void>=>{
    let h = rev_spawn(command,args,options);
    console.log(colors.green(`[${pkg.name} spawn] ${command} ${args.join(" ")}`));
    return new Promise((resolve,reject)=>{
        h.stderr&&h.stderr.on('data', (data) => {
            throw data;
        });
        h.on('error', (code) => {
            throw code;
        });
        h.on('close', function(error){
            if(error){
                console.log(colors.red(`[${pkg.name} spawn] fail`));
                reject();//"命令执行失败"
            }else{
                //console.log(`执行完毕`);
                console.log(colors.green(`[${pkg.name} spawn] success`));
                resolve();
            }
        });
    })
}

export const spawn = rev_spawn;
export namespace promises {
    export const spawn = promises_span
}