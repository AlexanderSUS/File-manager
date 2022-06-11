import { chdir } from 'process';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { isPathValid } from '../utils/isPathValid.js';
import { OPERATION_FAILED_MESSAGE } from '../const.js';

export const changeDirectory = (pathToDir) => {
  if (pathToDir && isPathValid(getAbsolutePath(pathToDir))) {
    try {
      chdir(pathToDir);
    } catch (err) {
      process.emit('message', OPERATION_FAILED_MESSAGE);
    }
  } else {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  }
}
