import yargs from 'yargs';

import deleteIndex from './index';

yargs.command(
  'delete [type] [selection]',
  'Delete something',
  (yargs) => {
    yargs
      .positional('type', {
        alias: 't',
        describe: 'What type of thing to delete',
        type: 'string',
      })
      .positional('selection', {
        alias: 's',
        describe: 'What to delete',
        type: 'string',
      });
  },
  async(args) => {
    deleteIndex(args);
  }
);
