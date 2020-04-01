import fs from 'fs-extra';
import { CONFIG_PATH } from 'Constants/locations';
import { log } from 'Utils/console';

export default async(args) => {
  if (args._[0] === 'install') {
    return;
  }

  const confExists = await fs.pathExists(CONFIG_PATH);
  if (!confExists) {
    log('Artisan not installed. Please use "art install" before running any commands.', 'error');
    process.exit();
  }
};
