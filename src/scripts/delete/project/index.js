import inquirer from 'inquirer';
import fs from 'fs-extra';

import { readConf, getProjects, removeProjectFromConf } from 'Utils/conf/index.js';
import selectProject from 'Utils/selectProject';
import { log } from 'Utils/console';

export default async({ selection }) => {
  const allProjects = await getProjects();

  const projectName = await selectProject(selection, allProjects, {
    noneAvailable: 'No projects available to delete. Archived projects must be unarchived before they can be deleted.',
    question: 'Which project would you like to delete? Don\'t see something you\'re looking for? Try unarchiving the project first.',
    doesNotExist: p => `Project "${p}" does not exist or is archived.`,
  });

  if (!projectName) {
    return;
  }

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to delete "${projectName}"? THIS CANNOT BE UNDONE!`,
    defualt: false,
  }]);

  if (!confirm) {
    log('Nothing will be deleted', 'info');
    return;
  }

  log('Deleting project...', 'info');
  const conf = await readConf();
  const projectPath = conf.projects[projectName].path;
  await fs.remove(projectPath);

  log('Saving configuration...', 'info');
  await removeProjectFromConf(projectName);

  log(`The project "${projectName}" has been deleted.`, 'success');
};
