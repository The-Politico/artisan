import yargs from 'yargs';

import conf from './index';

yargs.command(
  'conf',
  'Open the artisan conf file',
  (yargs) => {},
  async(args) => {
    conf(args);
  }
);
