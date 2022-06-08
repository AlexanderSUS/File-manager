import { INVALID_INPUT_MESSAGE } from '../const.js';

export const showInvalidInputMessage = () => {
  console.log(`\x1b[31m${INVALID_INPUT_MESSAGE} \x1b[0m`);
}