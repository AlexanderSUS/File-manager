import { createHash } from 'crypto';
import { existsSync, readFile } from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';

export function calcHash(pathToFile) {
  const resolvedPathToFile = getAbsolutePath(pathToFile);

  if (existsSync(resolvedPathToFile)) {
    readFile(resolvedPathToFile, 'utf-8', (err, data) => {
      if (err) {
        showOperationFailedMessage();
        showCurrentDir();
      }

      const hash = createHash('sha256').update(data).digest('hex');
      console.log(hash);
      showCurrentDir();
    });

    return;
  }

  showOperationFailedMessage();
  showCurrentDir();
}