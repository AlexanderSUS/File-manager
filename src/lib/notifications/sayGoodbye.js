import { FAREWELL_TEXT } from '../const.js';

export const sayGoodbye = (userName) => {
  console.log(`\x1b[33m ${FAREWELL_TEXT}, ${userName} \x1b[0m`);
}