import { RERUN_MESSAGE } from '../const.js';

export const showWrongArgMessage = (reasonText) => {
   console.log(`\x1b[31m${reasonText}\n${RERUN_MESSAGE} \x1b[0m`);
}
