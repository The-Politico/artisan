import yargs from 'yargs';
import healthChecks from 'Utils/healthChecks';
import setVerboseMode from 'Utils/setVerboseMode';

import deleteIndex from './index';

yargs.command('delete [type] [selection]', 'Delete something', (yargs) => {
  yargs
    .positional('type', {
      alias: 't',
      describe: 'What type of thing to delete',
      type: 'string',
    })
    .positional('selection', {
      alias: 's',
      describe: 'What to delete',
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

  await deleteIndex(args);
});
