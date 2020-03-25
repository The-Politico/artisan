import inquirer from 'inquirer';
import keys from 'lodash/keys';
import { log } from 'CLI/utils/console.js';
import { getActiveIllustrations } from 'CLI/utils/conf.js';

export default async(selection, logs) => {
  const illoConf = await getActiveIllustrations();
  const illos = keys(illoConf);

  const {
    noneAvailable,
    question,
    doesNotExist,
  } = logs;

  if (illos.length === 0) {
    log(noneAvailable, 'info');
    return;
  }

  if (!selection) {
    const inquiry = await inquirer.prompt([{
      type: 'list',
      name: 'illoName',
      message: question,
      choices: illos
        .map(i => ({
          name: i,
          value: i,
        })),
    }]);
    selection = inquiry.illoName;
  }

  if (illos.indexOf(selection) === -1) {
    log(doesNotExist(selection), 'error');
    return;
  }

  return selection;
};
