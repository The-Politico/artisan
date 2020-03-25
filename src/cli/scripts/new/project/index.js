import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { newProject } from '@politico/interactive-templates';
import slugify from 'slugify';

import { readConf, updateConf } from 'CLI/utils/conf';
import installDeps from 'CLI/utils/installDeps';
import { newRepo } from 'CLI/utils/git/index.js';
import { log } from 'CLI/utils/console';

import { PROJECTS_PATH } from 'CLI/constants/locations';

import activate from 'CLI/scripts/activate/index.js';

export default async({ testing = false } = {}) => {
  const conf = await readConf();

  const { projectName } = await inquirer.prompt([{
    type: 'input',
    name: 'projectName',
    message: 'What is this project called?',
    validate: val => {
      if (val in conf.projects) {
        return 'You already have a project with that name.';
      }

      if (!(/^[A-Za-z0-9\s-_]+$/.test(val))) {
        return 'Only letters, numbers, spaces, hyphens, and underscores allowed.';
      }

      return true;
    },
  }]);

  const projectPath = path.join(PROJECTS_PATH, projectName);
  const projectRepo = slugify(projectName, { lower: true }).replace(/_/g, '-');

  try {
    await fs.ensureDir(projectPath);

    log('Creating your new project...', 'info');
    await newProject('Graphic Embed', projectPath);

    log('Installing dependencies...', 'info');
    await installDeps(projectPath);

    if (!testing) {
      log('Creating GitHub repo...', 'info');
      await newRepo(projectPath, `illustration_${projectRepo}`);
    }
  } catch (e) {
    log(e, 'error');
    return;
  }

  if (!testing) {
    log('Saving configuration...', 'info');

    const newProjectConf = {
      projects: {},
    };

    newProjectConf.projects[projectName] = {
      status: 'alive',
      path: projectPath,
      lastModifiedTime: (new Date()).toISOString(),
      illustrations: {},
    };

    const illustrations = await fs.readdir(path.join(projectPath, 'illustrations'));
    illustrations.forEach(i => {
      newProjectConf.projects[projectName][i] = {};
    });

    await updateConf(newProjectConf);

    log('Activating new project...', 'info');
    await activate({ project: projectName });
  }

  log(`New project "${projectName}" created and activated`, 'success');
};
