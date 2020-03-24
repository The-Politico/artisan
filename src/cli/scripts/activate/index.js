import inquirer from 'inquirer';
import { log } from 'CLI/utils/console.js';
import { updateConf, getProjects } from 'CLI/utils/conf.js';

export default async(opts = {}) => {
  let project = opts.project;

  if (!project) {
    const allProjects = await getProjects();
    const inquiry = await inquirer.prompt([{
      type: 'list',
      name: 'projectName',
      message: 'Which project would you like to activate?',
      choices: allProjects.map(p => ({
        name: p,
        value: p,
      })),
    }]);
    project = inquiry.projectName;
  }

  await updateConf({ active: project });
  log(`"${project}" is now the active project.`, 'success');
};
