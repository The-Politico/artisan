import yargs from 'yargs';
import healthChecks from 'CLI/utils/healthChecks';
import setVerboseMode from 'CLI/utils/setVerboseMode';

import download from './index';

yargs.command('download [repo]', 'Downloads a project from GitHub', (yargs) => {
  yargs
    .positional('repo', {
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

  await download(args);
});
