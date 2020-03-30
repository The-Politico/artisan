import yargs from 'yargs';
import healthChecks from 'Utils/healthChecks';
import setVerboseMode from 'Utils/setVerboseMode';

import newIndex from './index';

yargs.command('new [type]', 'Creates something new', (yargs) => {
  yargs
    .positional('type', {
      alias: 't',
      describe: 'What type of thing to create',
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

  await newIndex(args);
});
