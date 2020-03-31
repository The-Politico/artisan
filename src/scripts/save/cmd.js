import yargs from 'yargs';

import save from './index';

yargs.command(
  'save [message]',
  'Saves latest changes to GitHub',
  (yargs) => {
    yargs
      .positional('message', {
        alias: 'r',
        describe: 'The name of the repo to download',
        type: 'string',
      });
  },
  async(args) => {
    save(args);
  }
);
