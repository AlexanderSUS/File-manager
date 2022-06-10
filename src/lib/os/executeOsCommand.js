import { EOL_ARG, CPUS_ARG, HOMEDIR_ARG, USERNAME_ARG, ARCH_ARG } from '../const.js';
import { showInvalidInputMessage } from '../notifications/showInvalidInputMessage.js'
import { cpus, EOL, homedir, userInfo, arch } from 'os';
import { showCurrentDir } from '../notifications/showCurrentDir.js';

export const executeOsCommand = (argument) => {
  const CORE = 'core: ';
  const SPEED = 'speed ';

  switch(argument) {
    case EOL_ARG:
      console.log(JSON.stringify(EOL));
      break;
    case CPUS_ARG:
      cpus().forEach(c => console.log(CORE, c.model, SPEED, c.speed ));
      break;
    case HOMEDIR_ARG:
      console.log(homedir());
      break;
    case USERNAME_ARG:
      console.log(userInfo().username);
      break;
    case ARCH_ARG: 
      console.log(arch());
      break;
    default:
      showInvalidInputMessage();
      return;
  }

  showCurrentDir();
}