const fs = require('fs/promises');
const path = require('path');
const { existsSync } = require('fs');

async function copyDir(dirPath, targetPath) {
  try{
    const stat = await fs.stat(dirPath);
    if(stat.isFile()) {
      await fs.copyFile(dirPath, targetPath);
    }else {
      let dirs = await fs.readdir(dirPath);
      if(stat.isDirectory()) {
        if(await existsSync(targetPath)) {
          await removeDir(targetPath);
        }
        await fs.mkdir(targetPath);
      }
      dirs = dirs.map(async(dir) => await copyDir(path.join(dirPath, dir), path.join(targetPath, dir)));
      return Promise.all(dirs);
    }
  }catch(e) {
    console.error(e);
  }
}

async function removeDir(dirPath) {
  try{
    const stat = await fs.stat(dirPath);
    if(stat.isFile()) {
      await fs.unlink(dirPath);
    }else {
      let dirs = await fs.readdir(dirPath);
      dirs = dirs.map(dir => removeDir(path.join(dirPath, dir)));
      await Promise.all(dirs);
      await fs.rmdir(dirPath);
    }
  }catch(e) {
    console.error(e);
  }
}

module.exports = {
  copyDir,
  removeDir
};