import { existsSync, unlink } from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';

export function deleteFile(pathToFile) {
  const resolvedPathToFile = getAbsolutePath(pathToFile);

  if (existsSync(resolvedPathToFile)) {
    unlink(resolvedPathToFile, (err) => {
      if (err) {
        showOperationFailedMessage();
        showCurrentDir();

        return;
      }
    });

    showCurrentDir();
    
    return;
  }

  showOperationFailedMessage();
  showCurrentDir();
}