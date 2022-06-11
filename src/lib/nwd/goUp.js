import { cwd } from 'process';
import { sep } from 'path';
import { isHomeDir } from '../utils/index.js';
import { changeDirectory } from './changeDirectory.js';

export function goUp() {
  if (!isHomeDir()) {
    const splitedPath = cwd().split(sep);
    splitedPath.pop();
    changeDirectory(splitedPath.join(sep));
  }
}
