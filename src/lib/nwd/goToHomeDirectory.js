import { chdir } from 'process';
import { homedir } from 'os';
import { OPERATION_FAILED_MESSAGE } from '../const.js';

export const goToHomeDirectory = () => {
  try {
    chdir(homedir());
  } catch (err) {
    process.emit('message', OPERATION_FAILED_MESSAGE);
  }
}
