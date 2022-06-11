import { existsSync, createWriteStream } from 'fs';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';

export function createFile(fileName) {
  const resolvedPathToFile = getAbsolutePath(fileName ? fileName : '');

  if (!fileName || existsSync(resolvedPathToFile)) {
    process.emit('message', OPERATION_FAILED_MESSAGE);

    return;
  }

  const writeSrem = createWriteStream(resolvedPathToFile);

  writeSrem.on('error', () => {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  })

  writeSrem.on('close', () => {
    process.emit('message', OK);
  })

  writeSrem.close();
}
