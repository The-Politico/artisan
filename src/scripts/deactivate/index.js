import inquirer from 'inquirer';
import { log } from 'Utils/console.js';
import { updateConf, getActiveProject } from 'Utils/conf/index.js';

export default async() => {
  const project = await getActiveProject();

  if (!project) {
    return;
  }

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to deactivate the current project: "${project.name}"`,
    default: true,
  }]);

  if (confirm) {
    await updateConf({ active: null });
    log(`No project is active.`, 'success');
  } else {
    log(`"${project.name}" is still the active project.`, 'success');
  }
};
