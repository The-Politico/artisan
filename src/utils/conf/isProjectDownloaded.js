import keys from 'lodash/keys';
import readConf from './readConf';

export default async(value, key) => {
  const conf = await readConf();
  let project = null;

  const isIt = keys(conf.projects).some(name => {
    if (conf.projects[name][key] === value) {
      project = conf.projects[name];
      project.name = name;
      return true;
    } else {
      return false;
    }
  });

  if (isIt) {
    return project;
  } else {
    return false;
  }
};
