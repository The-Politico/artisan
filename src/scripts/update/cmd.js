import yargs from 'yargs';

import update from './index';

yargs.command(
  'update [project]',
  'Updates Artisan to the latest version',
  (yargs) => { },
  async(args) => {
    update(args);
  }
);
