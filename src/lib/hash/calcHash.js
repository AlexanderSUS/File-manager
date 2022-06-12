import { createHash } from 'crypto';
import { existsSync, readFile } from 'fs';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';

export function calcHash(pathToFile) {
  const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');

  if (!pathToFile ||  !existsSync(resolvedPathToFile)) {
    process.emit('message', OPERATION_FAILED_MESSAGE);

    return;
  }

  readFile(resolvedPathToFile, 'utf-8', (err, data) => {
    if (err) {
      process.emit('message', OPERATION_FAILED_MESSAGE);

      return;
    }

    const hash = createHash('sha256').update(data).digest('hex');
    console.log(hash);
    process.emit('message', OK);
  });
}
