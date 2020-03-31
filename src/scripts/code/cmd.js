import yargs from 'yargs';

import code from './index';

yargs.command(
  'code',
  'Opens the active project in Atom',
  (yargs) => {},
  async(args) => {
    code(args);
  }
);
