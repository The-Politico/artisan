import readConf from './readConf';

export default async() => {
  const conf = await readConf();
  const activeProject = conf.projects[conf.active];

  if (activeProject) {
    activeProject.name = conf.active;
  }

  return activeProject;
};
