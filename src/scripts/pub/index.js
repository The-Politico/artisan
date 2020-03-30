import exec from 'Utils/exec';
import inquirer from 'inquirer';
import { getActiveProject } from 'Utils/conf/index.js';
import { log } from 'Utils/console';

export default async() => {
  const project = await getActiveProject();

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to publish "${project.name}"? This will make it live on the internet for anyone with the link to see.`,
    defualt: true,
  }]);

  if (!confirm) {
    log('The project will not be published', 'info');
    return;
  }

  await exec('npm run pubProduction');
};
