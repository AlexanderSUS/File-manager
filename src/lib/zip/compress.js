import { existsSync, mkdir, createReadStream, createWriteStream } from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showInvalidInputMessage } from '../notifications/showInvalidInputMessage.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { sep, join } from 'path';
import { createBrotliCompress } from 'zlib';

export function compress(pathToFile, destination) {
  const resolvedPathToFile = getAbsolutePath(pathToFile);
  const resolvedDestination = getAbsolutePath(destination);
  const fileName = resolvedPathToFile.split(sep).pop();
  const resolvedNewFileName = join(resolvedDestination, `${fileName}.br`);

  if (existsSync(resolvedPathToFile) && !existsSync(resolvedNewFileName)) {
    if (!existsSync(resolvedDestination)) {
      mkdir(resolvedDestination, { recursive: true }, (err) => {
        if (err) {
          showOperationFailedMessage();
          showCurrentDir();

          return;
        }
      });
    }

    const readStream = createReadStream(resolvedPathToFile);
    const writeSrem = createWriteStream(resolvedNewFileName);
    const brotli = createBrotliCompress();

    const stream = readStream.pipe(brotli).pipe(writeSrem);

    stream.on('finish', () => {
      showCurrentDir();
    })

    return; 
  }

  showInvalidInputMessage();
} 
