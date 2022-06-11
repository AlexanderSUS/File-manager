import { existsSync, mkdir, createReadStream, createWriteStream } from 'fs';
import { getAbsolutePath } from '../utils/index.js';
import { sep, join } from 'path';
import { createBrotliDecompress } from 'zlib';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';

export function decompress(pathToFile, destination) {
  const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');
  const resolvedDestination = getAbsolutePath(destination ? destination : '');
  const fileName = resolvedPathToFile.split(sep).pop();
  const resolvedNewFileName = join(resolvedDestination, fileName.slice(0, -3));

  if (!pathToFile || !destination || !existsSync(resolvedPathToFile) || !fileName.endsWith('.br') || existsSync(resolvedNewFileName)) {
    process.emit('message', OPERATION_FAILED_MESSAGE);

    return; 
  }

  // TODO move out
  if (!existsSync(resolvedPathToCopy)) {
    mkdir(resolvedPathToCopy, { recursive: true}, (err) => {
      if (err) {
        process.emit('message', OPERATION_FAILED_MESSAGE);
      }
    });
  }

  const readStream = createReadStream(resolvedPathToFile);
  const writeSrem = createWriteStream(resolvedNewFileName);
  const brotli = createBrotliDecompress();

  const stream = readStream.pipe(brotli).pipe(writeSrem);

  stream.on('finish', () => {
    process.emit('message', OK);
  })
} 
