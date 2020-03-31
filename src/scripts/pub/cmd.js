import yargs from 'yargs';

import publish from './index';

yargs.command(
  'pub [environment]',
  'Publish the embed live',
  (yargs) => {
    yargs
      .positional('environment', {
        alias: 'e',
        describe: 'Staging or production',
        type: 'string',
      })
      .option('staging', {
        alias: 's',
        describe: 'Publish to staging',
        type: 'boolean',
      })
      .option('production', {
        alias: 'p',
        describe: 'Publish to production',
        type: 'boolean',
      });
  },
  async(args) => {
    publish(args);
  }
);
