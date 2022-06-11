import { chdir } from 'process';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { isPathValid } from '../utils/isPathValid.js';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';

export const changeDirectory = (pathToDir) => {
  if (isPathValid(getAbsolutePath(pathToDir))) {
    try {
      chdir(pathToDir);
    } catch (err) {
      showOperationFailedMessage()
    }
  } else {
    showOperationFailedMessage()
  }

  showCurrentDir();
}
