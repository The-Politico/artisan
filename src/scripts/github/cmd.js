import yargs from 'yargs';

import github from './index';

yargs.command(
  'github [project]',
  'Opens the active project\'s GitHub page.',
  (yargs) => { },
  async(args) => {
    github(args);
  }
);
