import { existsSync, createWriteStream } from 'fs';
import { showCurrentDir } from '../notifications/showCurrentDir.js';
import { showInvalidInputMessage } from '../notifications/showInvalidInputMessage.js';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';
import { getAbsolutePath } from '../utils/getAbsolutePath.js';

export function createFile(fileName) {
  const resolvedPathToFile = getAbsolutePath(fileName);

  if (!existsSync(resolvedPathToFile)) {
    const writeSrem = createWriteStream(resolvedPathToFile);

    writeSrem.on('error', () => {
      showOperationFailedMessage();
      showCurrentDir();
    })

    writeSrem.close();

    showCurrentDir();

    return;
  }

  showInvalidInputMessage();
}
