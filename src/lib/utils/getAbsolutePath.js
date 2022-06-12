import path from 'path';
import { cwd } from 'process';

export const getAbsolutePath = (pathToDir) => {
  return path.isAbsolute(pathToDir) ? pathToDir : path.resolve(cwd(), pathToDir);
}
