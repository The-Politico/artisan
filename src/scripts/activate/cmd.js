import yargs from 'yargs';
import healthChecks from 'CLI/utils/healthChecks';
import setVerboseMode from 'CLI/utils/setVerboseMode';

import activate from './index';

yargs.command('activate [project]', 'Sets a project to be active', (yargs) => {
  yargs
    .positional('project', {
      alias: 'p',
      describe: 'The name of the project to activate',
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
  await activate(args);
});
