import yargs from 'yargs';

import start from './index';

yargs.command(
  'start',
  'Start a development server',
  (yargs) => {},
  async(args) => {
    start(args);
  }
);
