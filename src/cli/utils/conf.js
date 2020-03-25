import keys from 'lodash/keys';
import merge from 'lodash/merge';
import fs from 'fs-extra';
import update from 'immutability-helper';
import { log } from './console';

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

export const getActiveDirectory = async() => {
  let dir;
  const activeProject = await getActiveProject();

  if (!activeProject) {
    log('There is no active project. Please activate a project using the "activate" command.', 'error');
  } else {
    dir = activeProject.path;
  }

  return dir;
};

export const getIllustratorLocation = async() => {
  let loc;
  const conf = await readConf();

  if (!conf.illustratorLoc) {
    log('No Illustrator installation found. Try running the "install" again.', 'error');
  } else {
    loc = conf.illustratorLoc;
  }

  return loc;
};

export const getActiveIllustrations = async() => {
  let illustrations;
  const activeProject = await getActiveProject();

  if (!activeProject) {
    log('There is no active project. Please activate a project using the "activate" command.', 'error');
  } else {
    illustrations = activeProject.illustrations;
  }

  return illustrations;
};

export const updateConf = async(obj) => {
  const conf = await readConf();

  const updateSignature = {};

  const valueKeys = ['active', 'illustratorLoc'];
  valueKeys.forEach(k => {
    if (k in obj) {
      updateSignature[k] = {
        $set: obj[k],
      };
    }
  });

  const objKeys = ['projects'];
  objKeys.forEach(k => {
    if (obj[k]) {
      updateSignature[k] = {};
      for (let item in obj[k]) {
        updateSignature[k][item] = {
          $apply: val => {
            if (val) {
              return merge(val, obj[k][item]);
            } else {
              return val;
            }
          },
        };
      }
    }
  });

  return fs.outputJson(CONFIG_PATH, update(conf, updateSignature));
};
