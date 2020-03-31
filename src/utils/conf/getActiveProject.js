import { log } from '../console';
import readConf from './readConf';

export default async() => {
  const conf = await readConf();
  const activeProject = conf.projects[conf.active];

  if (activeProject) {
    activeProject.name = conf.active;
  }

  if (!activeProject) {
    log('There is no active project. Please activate a project using the "activate" command.', 'error');
  }

  return activeProject;
};
