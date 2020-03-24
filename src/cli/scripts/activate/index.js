import inquirer from 'inquirer';
import { log } from 'CLI/utils/console.js';
import { updateConf, getProjects, getActiveProject } from 'CLI/utils/conf.js';

export default async(opts = {}) => {
  let project = opts.project;

  if (!project) {
    const allProjects = await getProjects();
    const activeProject = await getActiveProject();

    const inquiry = await inquirer.prompt([{
      type: 'list',
      name: 'projectName',
      message: 'Which project would you like to activate?',
      choices: allProjects
        .filter(
          p => activeProject ?
            activeProject.name !== p :
            true
        )
        .map(p => ({
          name: p,
          value: p,
        })),
    }]);
    project = inquiry.projectName;
  }

  await updateConf({ active: project });
  log(`"${project}" is now the active project.`, 'success');
};
