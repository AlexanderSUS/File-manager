import { cwd } from 'process';
import { CURRENT_DIR_TEXT } from '../const.js';

export const showCurrentDir = () => {
  console.log(`\x1b[32m${CURRENT_DIR_TEXT} ${cwd()} \x1b[0m`);
}
