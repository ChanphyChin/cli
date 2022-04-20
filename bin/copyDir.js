const fs = require('fs/promises');
const path = require('path');
const { removeDir } = require('./removeDir');
const { existsSync } = require('fs');

async function copyDir(dirPath, targetPath) {
  try{
    const stat = await fs.stat(dirPath);
    if(stat.isFile()) {
      await fs.copyFile(dirPath, targetPath)
    }else {
      let dirs = await fs.readdir(dirPath)
      if(stat.isDirectory()) {
        if(await existsSync(targetPath)) {
          await removeDir(targetPath)
        }
        await fs.mkdir(targetPath)
      }
      dirs = dirs.map(async(dir) => await copyDir(path.join(dirPath, dir), path.join(targetPath, dir)))
      return Promise.all(dirs);
    }
  }catch(e) {
    console.error(e)
  }
}
module.exports = {
  copyDir
}