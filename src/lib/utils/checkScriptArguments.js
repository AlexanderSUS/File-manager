import { USER_NAME_PROP_ARGUMENT, WRONG_ARGS_MESSAGE, 
WRONG_NAME } from '../const.js';
import { showWrongArgMessage } from '../notifications/showWrongArgMessage.js';

export function checkScriptArguments(userNameProp, userName) {
  if (userNameProp !== USER_NAME_PROP_ARGUMENT || !userName) {
    const message = userNameProp !== USER_NAME_PROP_ARGUMENT ? WRONG_ARGS_MESSAGE : WRONG_NAME;

    showWrongArgMessage(message);
    process.exit();
  }
}
