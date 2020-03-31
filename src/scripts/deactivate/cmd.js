import yargs from 'yargs';

import deactivate from './index';

yargs.command(
  'deactivate',
  'Sets no project to be active',
  (yargs) => {},
  async(args) => {
    deactivate(args);
  }
);
