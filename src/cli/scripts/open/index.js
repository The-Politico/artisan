import inquirer from 'inquirer';
import keys from 'lodash/keys';

import { getActiveIllustrations } from 'CLI/utils/conf';
import exec from 'CLI/utils/exec';

export default async({ illustration }) => {
  const illos = await getActiveIllustrations();

  if (!illos) {
    return;
  }

  if (!illustration || !(illustration in illos)) {
    const { illoName } = await inquirer.prompt([{
      type: 'list',
      name: 'illoName',
      message: 'Which illustration would you like to open? (Don\'t see what you\'re looking for? Try changing the active project.)',
      choices: keys(illos)
        .map(i => ({
          name: i,
          value: i,
        })),
    }]);
    illustration = illoName;
  }

  console.log(`open illustrations/${illustration}/${illustration}.ai`);
  await exec(`open illustrations/${illustration}/${illustration}.ai`);
};
