import yargs from 'yargs';
import healthChecks from 'CLI/utils/healthChecks';
import setVerboseMode from 'CLI/utils/setVerboseMode';

import open from './index';

yargs.command('open [illustration]', 'Open an illustration', (yargs) => {
  yargs
    .positional('illustration', {
      alias: 'i',
      describe: 'The name of the illustration',
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

  await open(args);
});
