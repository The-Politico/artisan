import { log } from 'Utils/console';
import inquirer from 'inquirer';
import update from 'Scripts/update/index';
import isLatestVersion from 'Utils/isLatestVersion';

export default async(args) => {
  const cmd = args._[0];
  let inGoodHealth = true;

  if (args['skip-health']) {
    return {
      healthy: inGoodHealth,
    };
  }

  log('Performing health checks...', 'info');
  log('');
  const [isLatest] = await isLatestVersion();

  if (cmd !== 'update' && !isLatest) {
    const { confirm } = await inquirer.prompt([{
      type: 'confirm',
      name: 'confirm',
      message: `It looks like your version of Artisan is out of date. Would you like to update it?`,
      default: true,
    }]);

    if (confirm) {
      await update();
      log('');
      log(`Update complete. Please run ${cmd} again to use the latest version.`, 'success');
      process.exit();
    } else {
      inGoodHealth = false;
    }
  }

  return {
    healthy: inGoodHealth,
  };
};
