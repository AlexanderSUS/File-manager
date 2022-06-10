import { existsSync, rename } from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showInvalidInputMessage } from '../notifications/showInvalidInputMessage.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';

export function renameFile (fileName, newFileName) {
  if (fileName && newFileName) {
    const resolvedPathToFile = getAbsolutePath(fileName);
    const resolvedPathToNewFileName = getAbsolutePath(newFileName);

    if (existsSync(resolvedPathToFile) && !existsSync(resolvedPathToNewFileName)) {
      rename(resolvedPathToFile, newFileName, (err) => {
        if (err) {
          showOperationFailedMessage();
          showCurrentDir();

          return;
        }
      });

      showCurrentDir();

      return;
    }
  }

  showInvalidInputMessage();
}
