import path from 'path';
import fs from 'fs-extra';
import { log } from 'Utils/console';

export default async(destination, step) => {
  log(`[${step[0]}/${step[1]}] Checking for write access...`);
  try {
    const hash = () => Math.random().toString(36).substring(7);
    const testFile = `${hash() + hash() + hash() + hash()}.txt`;
    await fs.writeFile(path.join(destination, testFile), 'TEST', 'utf8');
    await fs.remove(path.join(destination, testFile));
    return true;
  } catch (e) {
    if (e.code === 'EACCES') {
      log('You don\'t have access to the destination folder. Try running the command with "sudo" before it.', 'error');
      return false;
    } else {
      throw e;
    }
  }
};
