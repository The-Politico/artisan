import yargs from 'yargs';
import healthChecks from 'Utils/healthChecks';
import setVerboseMode from 'Utils/setVerboseMode';

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
