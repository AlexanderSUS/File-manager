import { chdir } from 'process';
import { getAbsolutePath, isPathValid } from '../utils/index.js';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';

export const changeDirectory = (pathToDir) => {
  if (!pathToDir || !isPathValid(getAbsolutePath(pathToDir ? pathToDir : ''))) {
      process.emit('message', OPERATION_FAILED_MESSAGE);
  } 

  try {
    chdir(pathToDir);
    process.emit('message', OK);
  } catch (err) {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  }
}
