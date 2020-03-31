import fs from 'fs-extra';
import { CONFIG_PATH } from 'Constants/locations';

export default async(args) => {
  if (args._[0] === 'install') {
    return;
  }

  const confExists = await fs.pathExists(CONFIG_PATH);
  if (!confExists) {
    throw new Error('Artisan not installed. Please use "art install" before running any commands.');
  }
};
