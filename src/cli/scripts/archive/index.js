import inquirer from 'inquirer';
import { log } from 'CLI/utils/console.js';
import { updateConf, getProjects, getActiveProject } from 'CLI/utils/conf.js';

export default async(opts = {}) => {
  let project = opts.project;
  const activeProject = await getActiveProject();
  const allProjects = await getProjects();

  if (allProjects.length === 0) {
    log('No projects available to archive.', 'info');
    return;
  }

  if (!project) {
    const inquiry = await inquirer.prompt([{
      type: 'list',
      name: 'projectName',
      message: 'Which project would you like to archive?',
      choices: allProjects
        .map(p => ({
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

  const updateSignature = { projects: {} };
  if (project === activeProject.name) {
    updateSignature.active = null;
  }
  updateSignature.projects[project] = {};
  updateSignature.projects[project].status = 'archived';

  await updateConf(updateSignature);
  log(`"${project}" is now archived. Use "unarchive" to undo this.`, 'success');
};
