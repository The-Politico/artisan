import fs from 'fs-extra';
import update from 'immutability-helper';

import { CONFIG_PATH } from 'Constants/locations';

import readConf from './readConf';

export default async(project, illustration) => {
  const conf = await readConf();

  const updateSignature = {};
  updateSignature.projects = {
    $unset: [project],
  };

  return fs.outputJson(
    CONFIG_PATH,
    update(conf, updateSignature),
    { spaces: 2 }
  );
};
