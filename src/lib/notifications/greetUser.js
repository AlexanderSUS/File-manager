import { GREETING_TEXT } from "../const.js";

export const greetUser = (userName) => {
  console.log(`\x1b[33m${GREETING_TEXT}, ${userName} \x1b[0m`);
}