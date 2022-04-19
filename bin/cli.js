#! /usr/bin/env node
const inquirer = require('inquirer');
// const crossSpawn = require('cross-spawn');
const { program } = require('commander');
const path = require('path');
const fs = require('fs/promises');
const { existsSync } = require('fs');
const {removeDir} = require('./removeDir');
const {selectTemplate} = require('./selectTemplate');

program
  .version('1.0.0')
  .command('create <projectName>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exist')
  .action(async(projectName, options) => {
    const cwd = process.cwd();
    if(options.force) {
      removeDir(cwd)
    }else {
      const templates = path.join(__dirname, '../', 'templates');
      const templateList = await fs.readdir(templates)
      let { templateName } = await  await inquirer.prompt([
        {
          name: 'templateName',
          type: 'list',
          message: 'select type of template you want:',
          choices: templateList.map(template => ({
            name: template,
            value: template
          }))
        }
      ]);
      console.log(templateName);
      // 终端loading
      const Spinnies = require('spinnies');
      const spinnies = new Spinnies();
      // 终端文字美化
      const { Chalk } = await import('chalk');
      const chalk = new Chalk();

      spinnies.add('spinner', { text: chalk.blue('Down loading template') });
      
      const terminalPath = process.cwd();
      const targetPath = path.join(terminalPath, projectName)
      

      selectTemplate(templateName, targetPath)

      setTimeout(() => {
        spinnies.succeed('spinner', { text: 'Success!' });
        // spinnies.fail('spinner', { text: 'Fail :(' });
      }, 2000)
    }
  })

  program.parse();

