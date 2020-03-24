import { log } from 'CLI/utils/console';
import chalk from 'chalk';

import access from './access';
import config from './config';
import scripts from './scripts';
import templates from './templates';

const STEPS_COUNT = 4;

export default async function({ destination, verbose }) {
  let success = true;

  log(`Installing ai2jsx at ${chalk.bold(destination)}.`);

  await config(destination, [1, STEPS_COUNT]);

  // await templates(destination, [2, STEPS_COUNT]);
  //
  // const hasAccess = await access(destination, [3, STEPS_COUNT]);
  // if (hasAccess) {
  //   await scripts(destination, [4, STEPS_COUNT]);
  // } else {
  //   success = false;
  // }

  if (success) {
    log(`Ai2jsx was installed (or updated) on your computer.`, 'success');
    log(`You can run it by going to ${chalk.bold('File > Scripts > ai2jsx')} inside an Adobe Illustrator file.`, 'success');
  } else {
    log(`An error occured installing Ai2jsx, please check the logs above.`, 'error');
  }
};
