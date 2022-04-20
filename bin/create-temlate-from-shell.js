const spawn = require('cross-spawn');

async function createTemplateFromShell(templateName, projectName) {
  if(templateName === 'react') {
    spawn(`npx`, ['create-react-app'].concat([`${projectName}`]), { stdio: 'inherit' });
  }else if(templateName === 'vue') {
    const check = spawn('npm', ['view'].concat('vue'), { stdio: 'inherit' });
    check.on('close', function(code) {
      if(code === 1) {
        spawn(`npm`, ['install', '-g'].concat([`@vue/cli`]), { stdio: 'inherit' });
      }else {
        spawn(`vue`, ['create'].concat([`${projectName}`]), { stdio: 'inherit' });
      }
    })
  }
}

module.exports = createTemplateFromShell;