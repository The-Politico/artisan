import yargs from 'yargs';

import download from './index';

yargs.command(
  'download [repo]',
  'Downloads a project from GitHub',
  (yargs) => {
    yargs
      .positional('repo', {
        alias: 'r',
        describe: 'The name of the repo to download',
        type: 'string',
      });
  },
  async(args) => {
    download(args);
  }
);
