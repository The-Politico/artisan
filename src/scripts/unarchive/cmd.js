import yargs from 'yargs';
import healthChecks from 'CLI/utils/healthChecks';
import setVerboseMode from 'CLI/utils/setVerboseMode';

import unarchive from './index';

yargs.command('unarchive [project]', 'Unarchives a project', (yargs) => {
  yargs
    .positional('project', {
      alias: 'p',
      describe: 'The name of the project to unarchive',
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
  await unarchive(args);
});
