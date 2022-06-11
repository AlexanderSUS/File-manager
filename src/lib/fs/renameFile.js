import { existsSync, rename } from 'fs';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';
import { getAbsolutePath } from '../utils/index.js';

export function renameFile (fileName, newFileName) {
  const resolvedPathToFile = getAbsolutePath(fileName ? fileName : '');
  const resolvedPathToNewFileName = getAbsolutePath(newFileName ? newFileName : '');

  if (!fileName || !newFileName || !existsSync(resolvedPathToFile) || existsSync(resolvedPathToNewFileName)) {
    process.emit('message', OPERATION_FAILED_MESSAGE);

    return;
  }

  rename(resolvedPathToFile, newFileName, (err) => {
    if (err) {
      process.emit('message', OPERATION_FAILED_MESSAGE);
    } else {
      process.emit('message', OK);
    }
  });
}
