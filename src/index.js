import readline from 'readline';
import { checkScriptArguments, parseCommand } from './lib/utils/index.js'
import { showCurrentDir, greetUser,  sayGoodbye, showErrorMessage } from './lib/notifications/index.js';
import { goToHomeDirectory } from './lib/nwd/index.js';
import { OK } from './lib/const.js';

const args = process.argv.slice(2);
const [userNameProp, userNameValue] = args.pop().split('=');

checkScriptArguments(userNameProp, userNameValue);
greetUser(userNameValue);
goToHomeDirectory();
showCurrentDir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  parseCommand(line);
});

process.on('message', (msg) => {
  if (msg !== OK) {
    showErrorMessage(msg)
  }
  
  showCurrentDir();
});

process.on('exit', () => {
  sayGoodbye(userNameValue);
});
