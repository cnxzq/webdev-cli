#!/usr/bin/env node

import program from 'commander';
import {npm} from "../index"

program
.version("0.1")

program
.command('publish [messge] [version]')
.description("自动提交 git & npm")
.action(function(message,version){
    npm.publish(message,version,process.cwd());
    //, '修改package.json#version，提交 git && npm'
    //console.log(env);
    //console.log('Message:%s \nVersion %s', options.message, options.version);
});
program.parse(process.argv);