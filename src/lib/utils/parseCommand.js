import { CD_COMMAND, EXIT_COMMAND, LS_COMMAND, SPACE,
UP_COMMAND, OS_COMMAND, CAT_COMMAND, ADD_COMMAND } from '../const.js';
import { changeDirectory } from '../nwd/changeDirectory.js';
import { goUp } from '../nwd/goUp.js';
import { readDir } from '../nwd/readDir.js';
import { cwd } from 'process';
import { showInvalidInputMessage } from '../notifications/showInvalidInputMessage.js';
import { executeOsCommand } from '../os/executeOsCommand.js';
import { cat } from '../fs/cat.js';
import { createFile } from '../fs/createFile.js';

export function parseCommand(line) {
  const lineArgs = line.split(SPACE);
  const [command, ...args ] =  lineArgs;

  console.log(`\x1b[34m command: ${command} \x1b[0m`);
  console.log(`\x1b[34m args: ${args} \x1b[0m`);

  switch(command) {
    case EXIT_COMMAND: 
      process.exit();
    case LS_COMMAND: 
      readDir(cwd());
      break;
    case UP_COMMAND:
      goUp();
      break;
    case CD_COMMAND:
      const [destination] = args;
      changeDirectory(destination);
      break;
    case OS_COMMAND: 
      const [argument] = args;
      executeOsCommand(argument) 
      break;
    case CAT_COMMAND:
      const [sourceFile] = args;
      cat(sourceFile);
      break;
    case ADD_COMMAND:
      const [newFileName] = args;
      createFile(newFileName);
      break;
    default:
      showInvalidInputMessage();
  }
}