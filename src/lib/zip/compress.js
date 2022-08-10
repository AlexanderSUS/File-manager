import { existsSync, createReadStream, createWriteStream } from 'fs';
import { getAbsolutePath } from '../utils/index.js';
import { basename, join } from 'path';
import { createBrotliCompress } from 'zlib';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';

export function compress(pathToFile, destination) {
  const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');
  const resolvedDestination = getAbsolutePath(destination ? destination : '');
  const fileName = basename(resolvedPathToFile);
  const resolvedNewFileName = join(resolvedDestination, `${fileName}.br`);

  if (
    !pathToFile 
    || !destination 
    || !existsSync(resolvedPathToFile) 
    || !existsSync(resolvedDestination) 
    || existsSync(resolvedNewFileName)
    ) {
    process.emit('message', OPERATION_FAILED_MESSAGE);

    return; 
  }

  const readStream = createReadStream(resolvedPathToFile);
  const writeSrem = createWriteStream(resolvedNewFileName);
  const brotli = createBrotliCompress();

  const stream = readStream.pipe(brotli).pipe(writeSrem);

  stream.on('finish', () => {
    process.emit('message', OK);
  })
} 
