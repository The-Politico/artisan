import exec from 'Utils/exec';
import inquirer from 'inquirer';
import save from 'Scripts/save/index';
import { getActiveProject } from 'Utils/conf/index.js';
import { log } from 'Utils/console';

export default async({ environment, staging, production, save: shouldSave }) => {
  const project = await getActiveProject();
  if (!project) {
    return;
  }

  if (!environment) {
    if (production && !staging) {
      environment = 'production';
    } else if (staging && !production) {
      environment = 'staging';
    } else {
      const inquiry = await inquirer.prompt([{
        type: 'list',
        name: 'env',
        message: `Where would you like to publish "${project.name}"?`,
        choices: [
          {
            name: 'Staging (POLITICO VPN/WiFi Access Only)',
            value: 'staging',
          },
          {
            name: 'Production (Public Access)',
            value: 'production',
          },
        ],
      }]);
      environment = inquiry.env;
    }
  }

  if (environment === 'production') {
    const { confirm } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: `Are you sure you want to publish "${project.name}"? This will make it live on the internet for anyone with the link to see.`,
      defualt: false,
    }]);

    if (!confirm) {
      log('The project will not be published', 'info');
      return;
    }

    await exec('npm run pubProduction');
  } else if (environment === 'staging') {
    await exec('npm run pubStaging');
  } else {
    log(`"${environment}" is not a valid environment.`, 'error');
  }

  if (shouldSave) {
    const saveMsg = `Published - ${environment.toUpperCase()} - ${(new Date()).toISOString()}`;
    save({ message: saveMsg });
  }
};
