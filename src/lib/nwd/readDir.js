import fs from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';

export const readDir = async (pathToDir) =>  {
  fs.readdir(pathToDir, (err, files) => {
    if (err) {
      // TODO replace with custom error
      console.error(err);
      return;
    }

    files.forEach((file) => {
      console.log(file);
    }) 
    showCurrentDir();
  });
}