import path from 'path';
import fs from 'fs-extra';

import { INSTALL_DIRECTORY } from 'Constants/locations';
import { log } from 'Utils/console';

export default async(destination, version, step) => {
  const versions = await fs.readdir(INSTALL_DIRECTORY);

  const versionExists = versions.indexOf(version) > -1;
  if (!versionExists) {
    log(`Version "${version}" does not exist. Please choose one from the list:`, 'error');
    versions.forEach(v => {
      log(`- ${v}`);
    });
    log('');

    throw new Error('Version not found.');
  }

  log(`[${step[0]}/${step[1]}] Installing scripts (v${version})...`);
  await fs.copy(path.join(INSTALL_DIRECTORY, version, 'ai2jsx.js'), path.join(destination, 'ai2jsx.js'));
  log('Installed ai2jsx.js', 'info');

  await fs.copy(path.join(INSTALL_DIRECTORY, version, 'ai2jsx-config.json'), path.join(destination, 'ai2jsx-config.json'));
  log('Installed ai2jsx-config.json', 'info');
  log('');
};
