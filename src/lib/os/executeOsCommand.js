import { EOL_ARG, CPUS_ARG, HOMEDIR_ARG, USERNAME_ARG, ARCH_ARG, 
  OPERATION_FAILED_MESSAGE, OK } from '../const.js';
import { cpus, EOL, homedir, userInfo, arch } from 'os';

export const executeOsCommand = (argument) => {
  const CORE = 'Core';
  const SPEED = 'speed';

  switch(argument) {
    case EOL_ARG:
      console.log(JSON.stringify(EOL));
      break;
    case CPUS_ARG:
      console.log('Total cores: ', cpus().length);
      console.log(cpus().map(c => ({ model: c.model, speed: c.speed / 1000})));
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
      process.emit('message', OPERATION_FAILED_MESSAGE);
      return;
  }
  process.emit('message', OK);
}
