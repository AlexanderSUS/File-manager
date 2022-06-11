import { CD_COMMAND, EXIT_COMMAND, LS_COMMAND, SPACE,
UP_COMMAND, OS_COMMAND, CAT_COMMAND, ADD_COMMAND,
RN_COMMAND, CP_COMMAND, MV_COMMAND, RM_COMMAND, HASH_COMMAND,
COMPRESS_COMMAND, DECOMPRESS_COMMAND } from '../const.js';
import { changeDirectory } from '../nwd/changeDirectory.js';
import { goUp } from '../nwd/goUp.js';
import { readDir } from '../nwd/readDir.js';
import { cwd } from 'process';
import { showInvalidInputMessage } from '../notifications/showInvalidInputMessage.js';
import { executeOsCommand } from '../os/executeOsCommand.js';
import { cat } from '../fs/cat.js';
import { createFile } from '../fs/createFile.js';
import { renameFile } from '../fs/renameFile.js';
import { copyFile } from '../fs/copyFile.js';
import { moveFile } from '../fs/moveFile.js';
import { deleteFile } from '../fs/deleteFile.js';
import { calcHash } from '../hash/calcHash.js';
import { compress } from '../zip/compress.js';
import { decompress } from '../hash/decompress.js';

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
    case RN_COMMAND:
      const [oldFileName, newName] = args;
      renameFile(oldFileName, newName);
      break;
    case CP_COMMAND:
      copyFile(args[0], args[1]);
      break;
    case MV_COMMAND:
      moveFile(args[0], args[1]);
      break;
    case RM_COMMAND:
      deleteFile(args[0]);
      break;
    case HASH_COMMAND:
      calcHash(args[0]);
      break;
    case COMPRESS_COMMAND:
      compress(args[0], args[1]);
      break;
    case DECOMPRESS_COMMAND:
      decompress(args[0], args[1]);
      break;
    default:
      showInvalidInputMessage();
  }
}