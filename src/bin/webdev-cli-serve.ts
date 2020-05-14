#!/usr/bin/env node

import program from 'commander';

import {promises} from "../lib/spawn";

program
.description("部署服务cd-express,需要安装cd-express -g")
.action(function(){
    promises.spawn("cd-express",process.argv.slice(2))
});
program.parse(process.argv);