import readline from 'readline';
import { checkScriptArguments } from './lib/utils/checkScriptArguments.js'
import { parseCommand } from './lib/utils/parseCommand.js';
import { showCurrentDir } from './lib/notifications/showCurrentDir.js';
import { greetUser } from './lib/notifications/greetUser.js';
import { goToHomeDirectory } from './lib/nwd/goToHomeDirectory.js';
import { sayGoodbye } from './lib/notifications/sayGoodbye.js';

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

process.on('exit', () => {
  sayGoodbye(userNameValue);
});
