import path from 'path';
import fs from 'fs-extra';

import { INSTALL_DIRECTORY } from 'CLI/constants/locations';
import { log } from 'CLI/utils/console';

export default async(destination, step) => {
  log(`[${step[0]}/${step[1]}] Installing scripts...`);
  await fs.copy(path.join(INSTALL_DIRECTORY, 'ai2jsx.js'), path.join(destination, 'ai2jsx.js'));
  log('Installed ai2jsx.js', 'info');

  await fs.copy(path.join(INSTALL_DIRECTORY, 'ai2jsx-config.json'), path.join(destination, 'ai2jsx-config.json'));
  log('Installed ai2jsx-config.json', 'info');
};
