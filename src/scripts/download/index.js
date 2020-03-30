import inquirer from 'inquirer';
import toStartCase from 'lodash/startCase';
import fs from 'fs-extra';
import path from 'path';

import activate from 'CLI/scripts/activate/index.js';

import { parseRepoPath, cloneRepo, getAllAvailableRepos } from 'CLI/utils/git/index';
import installDeps from 'CLI/utils/installDeps';
import { log } from 'CLI/utils/console';
import { updateConf, isProjectDownloaded } from 'CLI/utils/conf/index';

import { PROJECTS_PATH } from 'CLI/constants/locations';

export default async({ repo: repoName }) => {
  if (!repoName) {
    const allRepos = await getAllAvailableRepos();

    if (allRepos.length === 0) {
      log('There are no projects for you to download.', 'info');
      return;
    }

    const inquiry = await inquirer.prompt([{
      type: 'list',
      name: 'repo',
      message: 'Choose a project to download',
      choices: allRepos,
    }]);
    repoName = inquiry.repo;
  }

  let repo, owner, projectName;

  try {
    const parsedRepo = parseRepoPath(repoName);
    repo = parsedRepo.repo;
    owner = parsedRepo.owner;

    projectName = toStartCase(
      repo.split('illustration_')[1]
    );
  } catch (e) {
    log(`Invalid repo "${repoName}" provided`, 'error');
    log(e);
    return;
  }

  const projectDownloaded = await isProjectDownloaded(repo, 'repo');
  if (projectDownloaded) {
    log(`You already have this project downloaded as "${projectDownloaded}"`, 'info');
    return;
  }

  const projectPath = path.join(PROJECTS_PATH, projectName);

  try {
    log('Downloading repo...', 'info');
    await cloneRepo(`git@github.com:${owner}/${repo}.git`, projectName);
  } catch (e) {
    log('Something went wrong trying to clone this repo.', 'error');
    log(e);
    return;
  }

  try {
    log('Installing dependencies...', 'info');
    await installDeps(projectPath);
  } catch (e) {
    log('Something went wrong installing this repos dependencies.', 'error');
    log(e);
    return;
  }

  log('Saving configuration...', 'info');

  const newProjectConf = {
    projects: {},
  };

  newProjectConf.projects[projectName] = {
    status: 'alive',
    path: projectPath,
    repo: repo,
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
