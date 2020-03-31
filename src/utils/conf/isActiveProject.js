import readConf from './readConf';

export default async() => {
  const conf = await readConf();
  const activeProject = conf.projects[conf.active];

  if (activeProject) {
    return true;
  } else {
    return false;
  }
};
