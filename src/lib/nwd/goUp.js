import { cwd } from 'process';
import { sep } from 'path';
import { isHomeDir } from '../utils/isHomeDir.js';
import { changeDirectory } from './changeDirectory.js';
import { showCurrentDir } from '../notifications/showCurrentDir.js';

export function goUp() {
  if (!isHomeDir()) {
    const splitedPath = cwd().split(sep);
    splitedPath.pop();
    changeDirectory(splitedPath.join(sep));

    return;
  }

  showCurrentDir();
}
