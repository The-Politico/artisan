import yargs from 'yargs';
import healthChecks from 'CLI/utils/healthChecks';
import setVerboseMode from 'CLI/utils/setVerboseMode';

import install from './index';

yargs.command('install [illustrator]', 'Installs ai2jsx into your installation of Adobe Illustrator', (yargs) => {
  yargs
    .positional('illustrator', {
      alias: 'i',
      describe: 'Adobe Illustrator app location',
      type: 'string',
      default: '/Applications/Adobe Illustrator 2020/Adobe Illustrator.app',
    })
    .option('destination', {
      alias: 'd',
      describe: 'Adobe Illustrator scripts location',
      type: 'string',
    })
    .option('verbose', {
      alias: 'v',
      describe: 'Log to the console',
      type: 'boolean',
      default: true,
    });
}, async function(args) {
  setVerboseMode(args.verbose);
  await healthChecks();

  await install(args);
});
