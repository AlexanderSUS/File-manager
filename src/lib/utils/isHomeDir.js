import { homedir } from 'os';
import { cwd } from 'process';

export const isHomeDir = (newPath = cwd()) => {
  return newPath === homedir(); 
}