
import { log } from '../console';

import getActiveProject from './getActiveProject';

export default async() => {
  let illustrations;
  const activeProject = await getActiveProject();

  if (!activeProject) {
    log('2 There is no active project. Please activate a project using the "activate" command.', 'error');
  } else {
    illustrations = activeProject.illustrations;
  }

  return illustrations;
};
