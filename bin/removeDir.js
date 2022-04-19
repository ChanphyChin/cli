const fs = require('fs/promises');
const path = require('path');
async function removeDir(dirPath) {
  try{
    const stat = await fs.stat(dirPath);
    if(stat.isFile()) {
      await fs.unlink(dirPath)
    }else {
      let dirs = await fs.readdir(dirPath)
      dirs = dirs.map(dir => removeDir(path.join(dirPath, dir)))
      await Promise.all(dirs)
      await fs.rmdir(dirPath)
    }
  }catch(e) {
    console.error(e)
  }
}
module.exports = {
  removeDir
}