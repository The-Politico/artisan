import { log } from './console';
import { getActiveProject } from './conf';

export default async() => {
  let dir;
  const activeProject = await getActiveProject();

  if (!activeProject) {
    log('There is no active project. Please activate a project using the "activate" command.', 'error');
    throw new Error();
  } else {
    dir = activeProject.path;
  }

  return dir;
};
