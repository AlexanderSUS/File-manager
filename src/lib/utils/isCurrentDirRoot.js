import { parse } from 'path'
import { cwd } from 'process'

export function isCurrentDirRoot() {
  const currentDir = cwd();
  const pathObj = parse(currentDir);

  return pathObj.root + pathObj.base === currentDir;
}
