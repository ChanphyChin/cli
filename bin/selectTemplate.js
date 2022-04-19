const fs = require('fs/promises');
const path = require('path');
const { copyDir } = require('./copyDir');

function selectTemplate(templateName, targetPath) {
  const templateDir = path.join(__dirname, '../', 'templates', templateName);
  console.log(targetPath);
  console.log(templateDir);
  copyDir(templateDir, targetPath);
}


module.exports = {
  selectTemplate
}