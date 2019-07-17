import { Logger } from 'CLI/utils/console';
import path from 'path';
import chalk from 'chalk';
import { writeFile, remove, copy } from 'fs-extra';
import { register } from '@politico/interactive-templates';
import getPitConfig from '@politico/interactive-templates/dist/utils/getConfig.js';

const INSTALL_DIRECTORY = path.resolve(__dirname, '../install');

export default async function({ destination, verbose }) {
  const logger = new Logger({ verbose });

  logger.log(`Installing ai2jsx at ${chalk.bold(destination)}.`);
  logger.log('[1/3] Checking for write access...');
  try {
    const hash = () => Math.random().toString(36).substring(7);
    const testFile = `${hash() + hash() + hash() + hash()}.txt`;
    await writeFile(path.join(destination, testFile), 'TEST', 'utf8');
    await remove(path.join(destination, testFile));
  } catch (e) {
    if (e.code === 'EACCES') {
      process.exitCode = 1;
      logger.log('You don\'t have access to the destination folder. Try running the command with "sudo" before it.', 'error');
      return;
    } else {
      throw e;
    }
  }

  logger.log('[2/3] Checking for templates...');
  // const conf = await getPitConfig();

  logger.log('[3/3] Installing scripts...');

  await copy(path.join(INSTALL_DIRECTORY, 'ai2jsx.js'), path.join(destination, 'ai2jsx.js'));
  logger.log('Installed ai2jsx.js', 'info');

  await copy(path.join(INSTALL_DIRECTORY, 'ai2jsx-config.json'), path.join(destination, 'ai2jsx-config.json'));
  logger.log('Installed ai2jsx-config.json', 'info');

  logger.log(`Ai2jsx was installed (or updated) on your computer.`, 'success');
  logger.log(`You can run it by going to ${chalk.bold('File > Scripts > ai2jsx')} inside an Adobe Illustrator file.`, 'success');
};
