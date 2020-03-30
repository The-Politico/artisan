import chalk from 'chalk';
import path from 'path';

import access from './access';
import config from './config';
import scripts from './scripts';
import templates from './templates';

import { log } from 'Utils/console';

const STEPS_COUNT = 4;

export default async function({ illustrator, destination, verbose }) {
  let success = true;

  if (!destination) {
    destination = path.join(path.dirname(illustrator), 'Presets.localized/en_US/Scripts/');
  }

  log(`Installing ai2jsx at ${chalk.bold(destination)}.`);

  await config(illustrator, destination, [1, STEPS_COUNT]);

  await templates(destination, [2, STEPS_COUNT]);

  const hasAccess = await access(destination, [3, STEPS_COUNT]);
  if (hasAccess) {
    await scripts(destination, [4, STEPS_COUNT]);
  } else {
    success = false;
  }

  if (success) {
    log(`Artisan was installed (or updated) on your computer.`, 'success');
    log(`You can run it by going to ${chalk.bold('File > Scripts > ai2jsx')} inside an Adobe Illustrator file.`, 'success');
  } else {
    log(`An error occured installing ai2jsx, please check the logs above.`, 'error');
  }
};
