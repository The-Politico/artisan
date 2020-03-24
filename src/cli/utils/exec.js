import { exec } from 'child_process';
import { log } from './console';
import { getActiveProject } from './conf';

export default async(cmd, dir) => {
  if (!dir) {
    const activeProject = await getActiveProject();

    if (!activeProject) {
      log('There is no active project. Please activate a project using the "activate" command.', 'error');
      throw new Error();
    } else {
      dir = activeProject.path;
    }
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
