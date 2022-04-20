#! /usr/bin/env node
const { program } = require('commander');
const path = require('path');
const {removeDir} = require('./removeDir');
const create = require('./create');
const { existsSync } = require('fs');

program
  .command('create <projectName>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action(async(projectName, options) => {
    const terminalPath = process.cwd();
    const targetPath = path.join(terminalPath, projectName)
    if(options.force) {
      if(await existsSync(targetPath)) {
        await removeDir(targetPath);
      }
      create(projectName);
    }else {
      if(await existsSync(targetPath)) {
        const { Chalk } = await import('chalk');
        const chalk = new Chalk();
        console.log(chalk.red('目录已经存在,如需覆盖请使用 common-cli-chanphy -f create <projectName> 指令'))
        return
      }
      create(projectName);
    }
  })

  program.parse();

