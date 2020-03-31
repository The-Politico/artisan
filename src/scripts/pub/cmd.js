import yargs from 'yargs';
import healthChecks from 'Utils/healthChecks';
import setVerboseMode from 'Utils/setVerboseMode';

import publish from './index';

yargs.command('pub [environment]', 'Publish the embed live', (yargs) => {
  yargs
    .positional('environment', {
      alias: 'e',
      describe: 'Staging or production',
      type: 'string',
    })
    .option('staging', {
      alias: 's',
      describe: 'Publish to staging',
      type: 'boolean',
    })
    .option('production', {
      alias: 'p',
      describe: 'Publish to production',
      type: 'boolean',
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
  await publish(args);
});
