import merge from 'lodash/merge';
import fs from 'fs-extra';
import update from 'immutability-helper';
import { log } from '../console';

import { CONFIG_PATH } from 'CLI/constants/locations';

import readConf from './readConf';

export default async(obj) => {
  if (!obj) {
    log('No update provided.', 'error');
    throw new Error('No update provided.');
  }

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
              return obj[k][item];
            }
          },
        };
      }
    }
  });

  return fs.outputJson(
    CONFIG_PATH,
    update(conf, updateSignature),
    { spaces: 2 }
  );
};
