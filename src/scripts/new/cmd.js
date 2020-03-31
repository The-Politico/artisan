import yargs from 'yargs';

import newIndex from './index';

yargs.command(
  'new [type]',
  'Creates something new',
  (yargs) => {
    yargs
      .positional('type', {
        alias: 't',
        describe: 'What type of thing to create',
        type: 'string',
      });
  },
  async(args) => {
    newIndex(args);
  }
);
