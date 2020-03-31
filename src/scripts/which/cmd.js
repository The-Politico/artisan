import yargs from 'yargs';

import which from './index';

yargs.command(
  'which',
  'Find out what the active project is',
  (yargs) => {},
  async function(args) {
    which(args);
  }
);
