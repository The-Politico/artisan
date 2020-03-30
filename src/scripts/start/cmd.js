import yargs from 'yargs';
import healthChecks from 'Utils/healthChecks';
import setVerboseMode from 'Utils/setVerboseMode';

import start from './index';

yargs.command('start', 'Start a development server', (yargs) => {
  yargs
    .option('verbose', {
      alias: 'v',
      describe: 'Log to the console',
      type: 'boolean',
      default: true,
    });
}, async function(args) {
  setVerboseMode(args.verbose);
  await healthChecks();
  await start(args);
});
