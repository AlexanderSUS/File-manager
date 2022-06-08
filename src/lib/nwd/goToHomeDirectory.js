import { chdir } from 'process';
import { homedir } from 'os';
import { showOperationFailedMessage } from '../notifications/showOperationFailedMessage.js';

export const goToHomeDirectory = () => {
  try {
    chdir(homedir());
  } catch (err) {
    showOperationFailedMessage()
  }
}