import { existsSync, mkdir, createReadStream, createWriteStream } from 'fs';
import { getAbsolutePath } from '../utils/index.js';
import { basename, join } from 'path';
import { createBrotliCompress } from 'zlib';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';

export function compress(pathToFile, destination) {
  const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');
  const resolvedDestination = getAbsolutePath(destination ? destination : '');
  const fileName = basename(resolvedPathToFile);
  const resolvedNewFileName = join(resolvedDestination, `${fileName}.br`);

  if (!pathToFile || !destination || !existsSync(resolvedPathToFile) || existsSync(resolvedNewFileName)) {
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
  const brotli = createBrotliCompress();

  const stream = readStream.pipe(brotli).pipe(writeSrem);

  stream.on('finish', () => {
    process.emit('message', OK);
  })
} 
