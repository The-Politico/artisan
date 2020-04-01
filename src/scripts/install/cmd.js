import yargs from 'yargs';

import install from './index';

yargs.command(
  'install [illustrator]',
  'Installs ai2jsx on your computer',
  (yargs) => {
    yargs
      .positional('illustrator', {
        alias: 'i',
        describe: 'Adobe Illustrator app location',
        type: 'string',
      });
  },
  async(args) => {
    install(args);
  }
);
