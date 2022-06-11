import { existsSync, mkdir, createReadStream, createWriteStream, unlink } from 'fs';
import { getAbsolutePath } from '../utils/index.js';
import { sep, join } from 'path';
import { OPERATION_FAILED_MESSAGE } from '../const.js';

export function moveFile(pathToFile, pathToNewDir) {
  const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');
  const resolvedPathToNewDir = getAbsolutePath(pathToNewDir ? pathToNewDir : '');
  const fileName = resolvedPathToFile.split(sep).pop();
  const resolvedNewFileName = join(resolvedPathToNewDir, fileName);

  if (!pathToFile || !pathToNewDir || !existsSync(resolvedPathToFile) && existsSync(resolvedNewFileName)) {
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
  const writeSrem = createWriteStream(resolvedNewFileName);

  readSream.on('error', () => {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  });

  writeSrem.on('error', () => {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  });

  readSream.pipe(writeSrem);

  writeSrem.on('close', () => {
    unlink(resolvedPathToFile, (err) => {
      if (err) {
        process.emit('message', OPERATION_FAILED_MESSAGE);
    
        return;
      }
    })

    process.emit('message', OK);
  });
} 
