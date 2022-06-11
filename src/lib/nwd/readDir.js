import fs from 'fs';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';

export const readDir = async (pathToDir) =>  {
  fs.readdir(pathToDir, (err, files) => {
    if (err) {
      process.emit('message', OPERATION_FAILED_MESSAGE);
    }

    files.forEach((file) => {
      console.log(file);
    }) 
    process.emit('message', OK);
  });
}