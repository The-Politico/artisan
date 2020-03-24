import { exec } from 'child_process';
import { log } from './console';

export default dir => {
  return new Promise((resolve, reject) => {
    const child = exec('npm install', { cwd: dir });

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
