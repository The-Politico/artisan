import yargs from 'yargs';

import activate from './index';

yargs.command(
  'activate [project]',
  'Sets a project to be active',
  (yargs) => {
    yargs
      .positional('project', {
        alias: 'p',
        describe: 'The name of the project to activate',
        type: 'string',
      });
  },
  async(args) => {
    activate(args);
  }
);
