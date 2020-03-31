import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { newProject } from '@politico/interactive-templates';

import { updateConf, getActiveProject } from 'Utils/conf/index.js';
import { log } from 'Utils/console';

export default async() => {
  const activeProject = await getActiveProject();

  if (!activeProject) {
    return;
  }

  const projectPath = activeProject.path;
  const projectName = activeProject.name;

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: `Do you want to create a new illustration in "${projectName}"?`,
    defualt: true,
  }]);

  if (!confirm) {
    log('You can only create new illustrations in the active project.', 'info');
    log('Change the active project using "activate" to create a new illustration in it.', 'info');
    return;
  }

  try {
    await fs.ensureDir(projectPath);

    log('Creating your new illustration...', 'info');
    await newProject('Extra Graphic Illustration', projectPath);
  } catch (e) {
    log(e, 'error');
    return;
  }

  log('Saving configuration...', 'info');
  const newProjectConf = { projects: {} };
  newProjectConf.projects[projectName] = {};
  newProjectConf.projects[projectName].illustrations = {};

  const illustrations = await fs.readdir(path.join(projectPath, 'illustrations'));
  illustrations.forEach(i => {
    if (!(i in activeProject.illustrations)) {
      newProjectConf.projects[projectName].illustrations[i] = {};
    }
  });

  await updateConf(newProjectConf);
  log(`New illustration in "${projectName}" created. Restart any active development servers to see the change take place.`, 'success');
};
