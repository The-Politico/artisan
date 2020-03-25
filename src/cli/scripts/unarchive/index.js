import inquirer from 'inquirer';
import { log } from 'CLI/utils/console.js';
import { updateConf, getProjects } from 'CLI/utils/conf.js';

export default async(opts = {}) => {
  let project = opts.project;
  const archivedProjects = await getProjects('archived');

  if (archivedProjects.length === 0) {
    log('No projects available to unarchive.', 'info');
    return;
  }

  if (!project) {
    const inquiry = await inquirer.prompt([{
      type: 'list',
      name: 'projectName',
      message: 'Which project would you like to make available?',
      choices: archivedProjects
        .map(p => ({
          name: p,
          value: p,
        })),
    }]);
    project = inquiry.projectName;
  }

  if (archivedProjects.indexOf(project) === -1) {
    log(`Project "${project}" does not exist or is not archived.`, 'error');
    return;
  }

  const updateSignature = { projects: {} };
  updateSignature.projects[project] = {};
  updateSignature.projects[project].status = 'alive';

  await updateConf(updateSignature);
  log(`"${project}" is now available. Use "activate" to set it as the active project.`, 'success');
};
