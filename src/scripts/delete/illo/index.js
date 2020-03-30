import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';

import { removeIllustrationFromConf, getActiveProject } from 'CLI/utils/conf/index.js';
import { log } from 'CLI/utils/console';
import selectIllustration from 'CLI/utils/selectIllustration';

export default async({ selection }) => {
  const activeProject = await getActiveProject();

  if (!activeProject) {
    log('You can only delete illustrations in the active project, but no active project is set. Use the "activate" command to set an active project.', 'error');
    return;
  }

  const projectPath = activeProject.path;
  const projectName = activeProject.name;

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: selection ?
      `Are you sure you want to delete the illustration "${selection}" in "${projectName}"? THIS CANNOT BE UNDONE!` :
      `Are you sure you want to delete an illustration in "${projectName}"? THIS CANNOT BE UNDONE!`,
    defualt: true,
  }]);

  if (!confirm) {
    log('Nothing will be deleted', 'info');
    return;
  }

  const illo = await selectIllustration(selection, {
    noneAvailable: 'No illustrations found in active project.',
    question: 'Which illustration would you like to delete?',
    doesNotExist: i => `Illustration "${i}" does not exist in the active project.`,
  });

  if (!illo) {
    return;
  }

  const illustratorFilePath = path.join(projectPath, 'illustrations', illo);
  const pageFilePath = path.join(projectPath, 'src', 'components', illo);

  try {
    log('Deleting your illustration...', 'info');
    await fs.remove(illustratorFilePath);
    await fs.remove(pageFilePath);
  } catch (e) {
    log(e, 'error');
    return;
  }

  log('Saving configuration...', 'info');

  await removeIllustrationFromConf(projectName, illo);
  log(`The illustration "${illo}" in "${projectName}" has been deleted. Restart any active development servers to see the change take place.`, 'success');
};
