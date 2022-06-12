import { existsSync, mkdir, createReadStream, createWriteStream } from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';
import { sep, join } from 'path';
import { createBrotliDecompress } from 'zlib';

export function decompress(pathToFile, destination) {
  const resolvedPathToFile = getAbsolutePath(pathToFile);
  const resolvedDestination = getAbsolutePath(destination);
  const fileName = resolvedPathToFile.split(sep).pop();
  const resolvedNewFileName = join(resolvedDestination, fileName.slice(0, -3));

  if (fileName.endsWith('.br') && existsSync(resolvedPathToFile) && !existsSync(resolvedNewFileName)) {
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
    const brotli = createBrotliDecompress();

    const stream = readStream.pipe(brotli).pipe(writeSrem);

    stream.on('finish', () => {
      showCurrentDir();
    })

    return; 
 }

  showOperationFailedMessage();
  showCurrentDir();
} 
