import yargs from 'yargs';
import healthChecks from 'CLI/utils/healthChecks';
import setVerboseMode from 'CLI/utils/setVerboseMode';

import publish from './index';

yargs.command('publish', 'Publish the embed live', (yargs) => {
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
  await publish(args);
});
