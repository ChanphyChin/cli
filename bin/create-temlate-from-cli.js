const fs = require('fs/promises');
const path = require('path');
const inquirer = require('inquirer');
const {selectTemplate} = require('./selectTemplate');

async function createTemplateFromCli(projectName) {
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
  // 终端loading
  const Spinnies = require('spinnies');
  const spinnies = new Spinnies();
  // 终端文字美化
  const { Chalk } = await import('chalk');
  const chalk = new Chalk();

  spinnies.add('spinner', { text: chalk.blue('Down loading template') });
  
  const terminalPath = process.cwd();
  const targetPath = path.join(terminalPath, projectName);
  
  await selectTemplate(templateName, targetPath).then(() => {
    spinnies.succeed('spinner', { text: 'Success!' });
  }).catch(err => {
      spinnies.fail('spinner', { text: JSON.stringify(err) });
  })
}

module.exports = createTemplateFromCli;