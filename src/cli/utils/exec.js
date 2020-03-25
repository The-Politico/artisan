import { exec } from 'child_process';
import { log } from './console';
import { getActiveDirectory } from './conf';

export default async(cmd, dir) => {
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
