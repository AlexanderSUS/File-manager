import fs from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';

export const readDir = async (pathToDir) =>  {
  fs.readdir(pathToDir, (err, files) => {
    if (err) {
      showOperationFailedMessage();
      return;
    }

    files.forEach((file) => {
      console.log(file);
    }) 
    showCurrentDir();
  });
}