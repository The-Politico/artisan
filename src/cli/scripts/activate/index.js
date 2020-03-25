import inquirer from 'inquirer';
import { log } from 'CLI/utils/console.js';
import { updateConf, getProjects, getActiveProject } from 'CLI/utils/conf.js';

export default async(opts = {}) => {
  let project = opts.project;
  const allProjects = await getProjects();
  const activeProject = await getActiveProject();
  const allProjectsNotActive = allProjects
    .filter(
      p => activeProject ?
        activeProject.name !== p :
        true
    );

  if (allProjectsNotActive.length === 0) {
    log('No projects available to activate.', 'info');
    return;
  }

  if (!project) {
    const inquiry = await inquirer.prompt([{
      type: 'list',
      name: 'projectName',
      message: 'Which project would you like to activate?',
      choices: allProjectsNotActive.map(p => ({
        name: p,
        value: p,
      })),
    }]);
    project = inquiry.projectName;
  }

  if (allProjects.indexOf(project) === -1) {
    log(`Project "${project}" does not exist or is archived.`, 'error');
    return;
  }

  await updateConf({ active: project });
  log(`"${project}" is now the active project.`, 'success');
};
