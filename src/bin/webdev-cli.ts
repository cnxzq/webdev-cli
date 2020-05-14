#!/usr/bin/env node

const program =require('commander');
const pkg = require("../package.json");

program
.version(pkg.version, '-v, --version',"输出版本号")
.option('-t --test <size>', '披萨尺寸', /^(large|medium|small)$/i, 'medium')
.option('-d --drink [drink]', 'Drink', /^(coke|pepsi|izze)$/i)
.usage('<command> [option]')//, 'option --type required'
.command('npm', '使用npm命令')
.command('serve', '使用serve命令')
.command('git', '使用git命令')
.parse(process.argv);