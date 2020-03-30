import keys from 'lodash/keys';

import { getActiveIllustrations } from 'Utils/conf/index.js';
import exec from 'Utils/exec';
import selectIllustration from 'Utils/selectIllustration';

export default async({ illustration }) => {
  const illos = await getActiveIllustrations();
  let selection = illustration;

  if (keys(illos).length === 1) {
    selection = keys(illos)[0];
  } else {
    selection = await selectIllustration(illustration, {
      noneAvailable: 'No illustrations found in active project.',
      question: 'Which illustration would you like to open? (Don\'t see what you\'re looking for? Try changing the active project.)',
      doesNotExist: i => `Illustration "${illustration}" does not exist in the active project.`,
    });
  }

  if (!selection) {
    return;
  }

  await exec(`open "illustrations/${selection}/${selection}.ai"`);
};
