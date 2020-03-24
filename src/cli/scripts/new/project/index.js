import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { newProject } from '@politico/interactive-templates';

import { readConf, updateConf } from 'CLI/utils/conf';
import installDeps from 'CLI/utils/installDeps';
import { log } from 'CLI/utils/console';

import { PROJECTS_PATH } from 'CLI/constants/locations';

import activate from 'CLI/scripts/activate/index.js';

export default async() => {
  const conf = await readConf();

  const { projectName } = await inquirer.prompt([{
    type: 'input',
    name: 'projectName',
    message: 'What is this project called?',
    validate: val => {
      if (val in conf.projects) {
        return 'You already have a project with that name.';
      }

      return true;
    },
  }]);

  const projectPath = path.join(PROJECTS_PATH, projectName);

  try {
    await fs.ensureDir(projectPath);

    log('Creating your new project...', 'info');
    await newProject('Graphic Embed', projectPath);

    log('Installing dependencies...', 'info');
    await installDeps(projectPath);
  } catch (e) {
    log(e, 'error');
    return;
  }

  log('Saving configuration...', 'info');
  const newProjectConf = {
    projects: {},
  };

  newProjectConf.projects[projectName] = {
    status: 'alive',
    path: projectPath,
  };

  await updateConf(newProjectConf);

  log('Activate new project...', 'info');
  await activate({ project: projectName });

  log(`New project "${projectName}" created and activated`, 'success');
};
