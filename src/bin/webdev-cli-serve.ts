#!/usr/bin/env node

import program from 'commander';
program
.option('--type [typeName]', 'type: dev && build')
.parse(process.argv);

const {type} = program;
if(type == 'dev'){
    console.log('do something rn', type)
}else if(type == 'build'){
    console.log('do something rn', type)
}else{
    console.log('params error');
    program.help();
}