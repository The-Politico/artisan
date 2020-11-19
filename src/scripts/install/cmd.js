import yargs from 'yargs';

import install from './index';

yargs.command(
  'install [illustrator] [installVersion]',
  'Installs ai2jsx on your computer',
  (yargs) => {
    yargs
      .positional('illustrator', {
        alias: 'i',
        describe: 'Adobe Illustrator app location',
        type: 'string',
      })
      .positional('installVersion', {
        describe: 'The version to use',
        default: '2.0.0',
        type: 'string',
      });
  },
  async(args) => {
    install(args);
  }
);
