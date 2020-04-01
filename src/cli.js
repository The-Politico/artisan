import yargs from 'yargs';

import './scripts/activate/cmd';
import './scripts/archive/cmd';
import './scripts/code/cmd';
import './scripts/conf/cmd';
import './scripts/deactivate/cmd';
import './scripts/delete/cmd';
import './scripts/dir/cmd';
import './scripts/download/cmd';
import './scripts/github/cmd';
import './scripts/install/cmd';
import './scripts/new/cmd';
import './scripts/open/cmd';
import './scripts/pub/cmd';
import './scripts/save/cmd';
import './scripts/start/cmd';
import './scripts/unarchive/cmd';
import './scripts/update/cmd';
import './scripts/which/cmd';

import { healthCheck, verbose, installationCheck } from './middleware';

yargs // eslint-disable-line
  .usage('Usage:\n  $0 <command> [options]')
  .scriptName('art')
  .middleware(verbose)
  .middleware(installationCheck)
  .middleware(healthCheck)

  .option('verbose', {
    type: 'boolean',
    alias: 'v',
    describe: 'Log info & errors to the console',
    default: true,
    global: true,
  })

  .option('skip-health', {
    type: 'boolean',
    describe: 'Skip the health checks',
    default: false,
    global: true,
  })

  .recommendCommands()
  .demandCommand()
  .help('howto')
  .argv;
