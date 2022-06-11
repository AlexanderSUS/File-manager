import { existsSync, mkdir, createReadStream, createWriteStream } from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showInvalidInputMessage } from '../notifications/showInvalidInputMessage.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { sep, join } from 'path';

export function copyFile(pathToFile, pathToCopy) {
    const resolvedPathToFile = getAbsolutePath(pathToFile);
    const resolvedPathToCopy = getAbsolutePath(pathToCopy);
    const fileName = resolvedPathToFile.split(sep).pop();
    const resolvedCopyFileName = join(resolvedPathToCopy, fileName);

  if (existsSync(resolvedPathToFile) && !existsSync(resolvedCopyFileName)) {
    if (!existsSync(resolvedPathToCopy)) {
      mkdir(resolvedPathToCopy, { recursive: true}, (err) => {
        if (err) {
          showOperationFailedMessage();
          showCurrentDir();

          return;
        }
      });
    }

    const readSream = createReadStream(resolvedPathToFile);
    const writeSrem = createWriteStream(resolvedCopyFileName);

    readSream.on('error', () => {
      showOperationFailedMessage();
      showCurrentDir();
    });

    writeSrem.on('error', () => {
      showOperationFailedMessage();
      showCurrentDir();
    });

    readSream.pipe(writeSrem);

    writeSrem.on('close', () => {
      showCurrentDir();
    });

    return; 
  }

  showInvalidInputMessage();
}