#!/usr/bin/env node

import program from 'commander';
import {git} from "../index"

program
.version("0.1")

program
.command('push [messge] [version]')
.description("自动提交 git")
.action(function(message,version){
    git.push(message,process.cwd());
    //, '修改package.json#version，提交 git && npm'
    //console.log(env);
    //console.log('Message:%s \nVersion %s', options.message, options.version);
});
program.parse(process.argv);