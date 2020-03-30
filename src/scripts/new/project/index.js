import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import { newProject } from '@politico/interactive-templates';
import slugify from 'slugify';

import { readConf, updateConf } from 'Utils/conf/index.js';
import installDeps from 'Utils/installDeps';
import { newRepo } from 'Utils/git/index.js';
import { log } from 'Utils/console';

import { PROJECTS_PATH } from 'Constants/locations';

import activate from 'Scripts/activate/index.js';

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

  log('Saving configuration...', 'info');

  const newProjectConf = {
    projects: {},
  };

  newProjectConf.projects[projectName] = {
    status: 'alive',
    path: projectPath,
    repo: `illustration_${projectRepo}`,
    lastModifiedTime: (new Date()).toISOString(),
    illustrations: {},
  };

  const illustrations = await fs.readdir(path.join(projectPath, 'illustrations'));
  illustrations.forEach(i => {
    newProjectConf.projects[projectName].illustrations[i] = {};
  });

  await updateConf(newProjectConf);

  log('Activating new project...', 'info');
  process.env.VERBOSE_MODE = false;
  await activate({ project: projectName });
  process.env.VERBOSE_MODE = true;

  log(`New project "${projectName}" created and activated`, 'success');
};
