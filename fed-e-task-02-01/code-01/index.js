#!/usr/bin/env node
const commander = require('commander')

commander.version('1.0.0', '-v, --version')

commander.command('create <name>').description('创建一个文件').alias('c').action((name) => {
	require('./command/create')(name)
})

commander.command('delete <name>').description('删除一个文件').alias('d').action((name) => {
	require('./command/delete')(name)
})

commander.command('list').description('查看所有创建的文件名称').alias('l').action(() => {
	require('./command/list')()
})

commander.parse(process.argv)
