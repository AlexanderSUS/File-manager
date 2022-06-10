import { createReadStream, existsSync} from 'fs';
import { showCurrentDir } from "../notifications/showCurrentDir.js";
import { showOperationFailedMessage } from "../notifications/showOperationFailedMessage.js";
import { showInvalidInputMessage } from "../notifications/showInvalidInputMessage.js";
import { getAbsolutePath } from "../utils/getAbsolutePath.js";

export function cat(pathToFile) {
  const resolvedPathToFile = getAbsolutePath(pathToFile);

  if (existsSync(resolvedPathToFile)) {
    const stream =  createReadStream(pathToFile);

    stream.pipe(process.stdout);

    stream.on('error', () => {
      showOperationFailedMessage();
      showCurrentDir();
    })

    stream.on('end', () => {
      showCurrentDir();
    })

    return;
  }

  showInvalidInputMessage();
}
