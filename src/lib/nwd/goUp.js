import { cwd } from 'process';
import { sep } from 'path';
import { changeDirectory } from './index.js';
import { isCurrentDirRoot } from '../utils/index.js';
import { OK } from '../const.js';

export function goUp() {
  if (isCurrentDirRoot()) {
    process.emit('message', OK);

    return;
  }

  const splitedPath = cwd().split(sep);

  splitedPath.pop();
  changeDirectory(splitedPath.join(sep));
}
