import chalk from 'chalk';
import path from 'path';
import fs from 'fs-extra';

import access from './access';
import config from './config';
import scripts from './scripts';
import templates from './templates';

import { readConf } from 'Utils/conf/index';
import { log } from 'Utils/console';
import { CONFIG_PATH } from 'Constants/locations';

const STEPS_COUNT = 4;

const DEFAULT_INSTALLATION = '/Applications/Adobe Illustrator 2020/Adobe Illustrator.app';

export default async function({ illustrator, destination } = {}) {
  let success = true;

  if (!destination) {
    const confExists = await fs.pathExists(CONFIG_PATH);
    if (!illustrator && confExists) {
      const conf = await readConf();
      if (conf.illustratorLoc) {
        illustrator = conf.illustratorLoc;
        destination = path.join(path.dirname(conf.illustratorLoc), 'Presets.localized/en_US/Scripts/');
        log('Previous installation found.', 'info');
      } else {
        illustrator = DEFAULT_INSTALLATION;
        destination = path.join(path.dirname(DEFAULT_INSTALLATION), 'Presets.localized/en_US/Scripts/');
        log('No installation location provided. Using default location.', 'info');
      }
    } else {
      illustrator = DEFAULT_INSTALLATION;
      destination = path.join(path.dirname(DEFAULT_INSTALLATION), 'Presets.localized/en_US/Scripts/');
      log('No installation location provided. Using default location.', 'info');
    }
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
    log(`Start a new project by running the "new project" command.`, 'success');
  } else {
    log(`An error occured installing ai2jsx, please check the logs above.`, 'error');
  }
};
