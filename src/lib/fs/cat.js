import { createReadStream, existsSync} from 'fs';
import { OK, OPERATION_FAILED_MESSAGE } from '../const.js';
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

export function cat(pathToFile) {
  const resolvedPathToFile = getAbsolutePath(pathToFile ? pathToFile : '');

  if (!pathToFile || !existsSync(resolvedPathToFile)) {
    process.emit('message', OPERATION_FAILED_MESSAGE);

    return;
  }

  const stream = createReadStream(resolvedPathToFile);

  stream.pipe(process.stdout);

  stream.on('error', () => {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  })

  stream.on('end', () => {
    process.emit('message', OK);
  })
}
