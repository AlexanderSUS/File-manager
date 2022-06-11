import { existsSync, unlink } from 'fs';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';

export function deleteFile(pathToFile) {
  const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');

  if (!pathToFile || !existsSync(resolvedPathToFile)) {
    process.emit('message', OPERATION_FAILED_MESSAGE);

    return;
  }

  unlink(resolvedPathToFile, (err) => {
    if (err) {
      process.emit('message', OPERATION_FAILED_MESSAGE);
    }

    process.emit('message', OK);
  });
}