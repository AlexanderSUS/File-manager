import { existsSync, createReadStream, createWriteStream } from 'fs';
import { getAbsolutePath } from '../utils/index.js';
import { basename, join } from 'path';
import { createBrotliDecompress } from 'zlib';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';

export function decompress(pathToFile, destination) {
  const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');
  const resolvedDestination = getAbsolutePath(destination ? destination : '');
  const fileName = basename(resolvedPathToFile);
  const resolvedNewFileName = join(resolvedDestination, fileName.slice(0, -3));

  if (!pathToFile || !destination || !existsSync(resolvedPathToFile) || !fileName.endsWith('.br') || !existsSync(resolvedPathToCopy) || existsSync(resolvedNewFileName)) {
    process.emit('message', OPERATION_FAILED_MESSAGE);

    return; 
  }

  const readStream = createReadStream(resolvedPathToFile);
  const writeSrem = createWriteStream(resolvedNewFileName);
  const brotli = createBrotliDecompress();

  const stream = readStream.pipe(brotli).pipe(writeSrem);

  stream.on('finish', () => {
    process.emit('message', OK);
  })
} 
