const fs = require('fs/promises');
const path = require('path');
const { copyDir } = require('./copyDir');

async function selectTemplate(templateName, targetPath) {
  const templateDir = path.join(__dirname, '../', 'templates', templateName);
  await copyDir(templateDir, targetPath);
}


module.exports = {
  selectTemplate
}