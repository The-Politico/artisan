import yargs from 'yargs';

import dir from './index';

yargs.command(
  'dir',
  'Open the artisan projects folder',
  (yargs) => {

  },
  async(args) => {
    dir(args);
  }
);
