import { OPERATION_FAILED_MESSAGE } from '../const.js';

export const showOperationFailedMessage = () => {
  console.log(`\x1b[31m${OPERATION_FAILED_MESSAGE} \x1b[0m`);
}