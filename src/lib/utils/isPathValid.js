import fs from 'fs';

export const isPathValid = (dirPath) =>  {
  return fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()
}