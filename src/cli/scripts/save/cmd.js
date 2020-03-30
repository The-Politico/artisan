import yargs from 'yargs';
import healthChecks from 'CLI/utils/healthChecks';
import setVerboseMode from 'CLI/utils/setVerboseMode';

import save from './index';

yargs.command('save [message]', 'Saves latest changes to GitHub', (yargs) => {
  yargs
    .positional('message', {
      alias: 'r',
      describe: 'The name of the repo to download',
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

  await save(args);
});
