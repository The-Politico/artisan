import keys from 'lodash/keys';
import fs from 'fs-extra';
import update from 'immutability-helper';

import { CONFIG_PATH } from 'CLI/constants/locations';

export const readConf = () => {
  return fs.readJson(CONFIG_PATH);
};

export const getProjects = async(aliveOnly = true) => {
  const conf = await readConf();
  return keys(conf.projects)
    .filter(p => aliveOnly ? conf.projects[p].status === 'alive' : true);
};

export const getActiveProject = async(aliveOnly = true) => {
  const conf = await readConf();
  const activeProject = conf.projects[conf.active];

  if (activeProject) {
    activeProject.name = conf.active;
  }

  return activeProject;
};

export const updateConf = async(obj) => {
  const conf = await readConf();

  const updateSignature = {};

  if ('active' in obj) {
    updateSignature.active = {
      $set: obj.active,
    };
  }

  const keys = ['projects'];
  keys.forEach(k => {
    if (obj[k]) {
      updateSignature[k] = {};
      for (let item in obj[k]) {
        updateSignature[k][item] = {
          $set: obj[k][item],
        };
      }
    }
  });

  return fs.outputJson(CONFIG_PATH, update(conf, updateSignature));
};
