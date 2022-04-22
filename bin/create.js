const inquirer = require('inquirer');
const createTemplateFromCli = require('./create-temlate-from-cli');
const createTemplateFromShell = require('./create-temlate-from-shell');

async function create(projectName) {
  let { templateName } = await  await inquirer.prompt([
    {
      name: 'templateName',
      type: 'list',
      message: 'select type of template you want:',
      choices: [
        {
          name: 'vue',
          value: 'vue'
        },
        {
          name: 'react',
          value: 'react'
        },
        {
          name: 'angular',
          value: 'angular'
        },
        // {
        //   name: 'static-templates',
        //   value: 'static-templates'
        // }
      ]
    }
  ]);
  if(templateName === 'static-templates') {
    createTemplateFromCli(projectName)
  }else {
    createTemplateFromShell(templateName, projectName)
  }
}
module.exports = create;