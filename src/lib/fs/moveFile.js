import { existsSync, mkdir, createReadStream, createWriteStream, unlink } from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showInvalidInputMessage } from '../notifications/showInvalidInputMessage.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { sep, join } from 'path';

export function moveFile(pathToFile, pathToNewDir) {
  const resolvedPathToFile = getAbsolutePath(pathToFile);
  const resolvedPathToNewDir = getAbsolutePath(pathToNewDir);
  const fileName = resolvedPathToFile.split(sep).pop();
  const resolvedNewFileName = join(resolvedPathToNewDir, fileName);

  if (existsSync(resolvedPathToFile) && !existsSync(resolvedNewFileName)) {
    if (!existsSync(resolvedPathToNewDir)) {
      mkdir(resolvedPathToNewDir, { recursive: true }, (err) => {
        if (err) {
          showOperationFailedMessage();
          showCurrentDir();

          return;
        }
      });
    }

    const readSream = createReadStream(resolvedPathToFile);
    const writeSrem = createWriteStream(resolvedNewFileName);

    readSream.on('error', () => {
      showOperationFailedMessage();
      showCurrentDir();

      return;
    });

    writeSrem.on('error', () => {
      showOperationFailedMessage();
      showCurrentDir();

      return;
    });

    readSream.pipe(writeSrem);

    writeSrem.on('close', () => {
      unlink(resolvedPathToFile, (err) => {
        if (err) {
          showOperationFailedMessage();
          showCurrentDir();

          return;
        }
      })

      showCurrentDir();
    });

    return; 
  }

  showOperationFailedMessage();
  showCurrentDir();
} 
