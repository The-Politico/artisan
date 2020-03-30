import inquirer from 'inquirer';
import { log } from 'CLI/utils/console.js';
import { updateConf, getActiveProject } from 'CLI/utils/conf/index.js';

export default async() => {
  const project = await getActiveProject();

  if (!project) {
    log(`There is no active project.`);
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
