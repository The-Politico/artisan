import yargs from 'yargs';
import healthChecks from 'Utils/healthChecks';
import setVerboseMode from 'Utils/setVerboseMode';

import publish from './index';

yargs.command('pub', 'Publish the embed live', (yargs) => {
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
