import yargs from 'yargs';

import open from './index';

yargs.command(
  'open [illustration]',
  'Open an illustration',
  (yargs) => {
    yargs
      .positional('illustration', {
        alias: 'i',
        describe: 'The name of the illustration',
        type: 'string',
      });
  },
  async(args) => {
    open(args);
  }
);
