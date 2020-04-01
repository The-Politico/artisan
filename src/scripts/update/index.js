import { log } from 'Utils/console.js';
import exec from 'Utils/exec';
import isLatestVersion from 'Utils/isLatestVersion';
import install from 'Scripts/install/index';

export default async(opts = {}) => {
  log('Checking for latest version...', 'info');
  const [isLatest, latestBuild] = await isLatestVersion();

  if (isLatest) {
    log('Artisan is already up to date.', 'success');
    return;
  }

  log(`A new version of Artisan is available (v${latestBuild}). Installing...`, 'info');
  await exec(`npm install -g @politico/artisan@${latestBuild}`, 'root');

  log(`Updating ai2jsx scripts...`, 'info');
  await install();

  log(`Artisan has been updated to version ${latestBuild}.`, 'success');
};
