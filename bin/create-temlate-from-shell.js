const spawn = require('cross-spawn');

async function createTemplateFromShell(templateName, projectName) {
  switch(templateName) {
    case 'vue':
      var check = spawn('npm', ['list', '-g'].concat('vue'), { stdio: 'inherit' });
      check.on('close', function(code) {
        if(code === 1) {
          spawn.sync(`npm`, ['install', '-g'].concat(['@vue/cli']), { stdio: 'inherit' });
        }
        spawn(`vue`, ['create'].concat([`${projectName}`]), { stdio: 'inherit' });
      })
      break;
    case 'react':
      const inquirer = require('inquirer');
      let { templateType } = await  await inquirer.prompt([
        {
          name: 'templateType',
          type: 'list',
          message: 'select template of react:',
          choices: [
            {
              name: 'javascript',
              value: 'javascript'
            },
            {
              name: 'typescript',
              value: 'typescript'
            },
          ]
        }
      ]);
      if(templateType === 'typescript') {
        spawn(`npx`, ['create-react-app', '--template', 'typescript'].concat([`${projectName}`]), { stdio: 'inherit' });
      }else {
        spawn(`npx`, ['create-react-app'].concat([`${projectName}`]), { stdio: 'inherit' });
      }
      break;
    case 'angular':
      var check = spawn('npm', ['list', '-g'].concat('ng'), { stdio: 'inherit' });
      check.on('close', function(code) {
        if(code === 1) {
          spawn.sync(`npm`, ['install', '-g', '--force'].concat(['@angular/cli']), { stdio: 'inherit' });
        }
        spawn(`ng`, ['new'].concat([`${projectName}`]), { stdio: 'inherit' });
      })
      break;
  }
}

module.exports = createTemplateFromShell;