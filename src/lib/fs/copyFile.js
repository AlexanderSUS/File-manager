import { existsSync, mkdir, createReadStream, createWriteStream } from 'fs';
import { getAbsolutePath } from '../utils/index.js';
import { basename, join } from 'path';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';

export function copyFile(pathToFile, pathToCopy) {
    const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');
    const resolvedPathToCopy = getAbsolutePath(pathToCopy ? pathToCopy : '');
    const fileName = basename(resolvedPathToFile);
    const resolvedCopyFileName = join(resolvedPathToCopy, fileName);

  if (!pathToFile || !pathToCopy || !existsSync(resolvedPathToFile) || existsSync(resolvedCopyFileName)) {
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

  const readSream = createReadStream(resolvedPathToFile);
  const writeSrem = createWriteStream(resolvedCopyFileName);

  readSream.on('error', () => {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  });

  writeSrem.on('error', () => {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  });

  readSream.pipe(writeSrem);

  writeSrem.on('close', () => {
    process.emit('message', OK);
  });
}
