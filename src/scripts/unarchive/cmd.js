import yargs from 'yargs';

import unarchive from './index';

yargs.command(
  'unarchive [project]',
  'Unarchives a project',
  (yargs) => {
    yargs
      .positional('project', {
        alias: 'p',
        describe: 'The name of the project to unarchive',
        type: 'string',
      });
  },
  async(args) => {
    unarchive(args);
  }
);
