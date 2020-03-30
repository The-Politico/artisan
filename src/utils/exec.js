import { exec } from 'child_process';
import { log } from './console';
import { getActiveDirectory } from './conf';

import { STATE_PATH } from 'CLI/constants/locations';

export default async(cmd, dir) => {
  if (dir === 'root') {
    dir = STATE_PATH;
  }

  if (!dir) {
    dir = await getActiveDirectory();
  }

  return new Promise((resolve, reject) => {
    const child = exec(cmd, { cwd: dir });

    child.stdout.on('data', data => {
      log(data);
    });

    child.on('close', (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
