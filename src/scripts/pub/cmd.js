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
      })
      .option('save', {
        describe: 'Save to GitHub after publishing',
        type: 'boolean',
        default: true,
      });
  },
  async(args) => {
    publish(args);
  }
);
