import yargs from 'yargs';
import healthChecks from 'Utils/healthChecks';
import setVerboseMode from 'Utils/setVerboseMode';

import archive from './index';

yargs.command('archive [project]', 'Archives a project', (yargs) => {
  yargs
    .positional('project', {
      alias: 'p',
      describe: 'The name of the project to archive',
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
  await archive(args);
});
