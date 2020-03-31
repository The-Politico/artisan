import yargs from 'yargs';

import archive from './index';

yargs.command(
  'archive [project]',
  'Archives a project',
  (yargs) => {
    yargs
      .positional('project', {
        alias: 'p',
        describe: 'The name of the project to archive',
        type: 'string',
      });
  },
  async(args) => {
    archive(args);
  }
);
