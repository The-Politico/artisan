import fs from 'fs-extra';

import { CONFIG_PATH } from 'CLI/constants/locations';
import { updateConf } from 'CLI/utils/conf';
import { log } from 'CLI/utils/console';

export default async(illustrator, destination, step) => {
  log(`[${step[0]}/${step[1]}] Checking for config...`);
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
