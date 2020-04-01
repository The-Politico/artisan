import { log } from 'Utils/console.js';
import { isActiveProject, getActiveProject } from 'Utils/conf/index.js';

export default async() => {
  const isProject = await isActiveProject();
  if (!isProject) {
    log(`There is no active project.`, 'info');
    return;
  }

  const project = await getActiveProject();
  log(`"${project.name}" is the active project.`, 'info');
};
