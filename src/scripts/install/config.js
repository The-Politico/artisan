import fs from 'fs-extra';

import { CONFIG_PATH } from 'Constants/locations';
import { updateConf } from 'Utils/conf/index.js';
import { log } from 'Utils/console';

export default async(illustrator, destination, step) => {
  log('');
  log(`[${step[0]}/${step[1]}] Checking for config...`);
  log('');
  await fs.ensureFile(CONFIG_PATH);

  const initialConf = {
    active: null,
    projects: {},
    illustratorLoc: illustrator,
  };

  const confRaw = await fs.readFile(CONFIG_PATH, 'utf8');
  if (confRaw.length === 0) {
    await fs.outputJson(CONFIG_PATH, initialConf);
  } else {
    updateConf(initialConf);
  }
};
