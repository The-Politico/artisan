import yargs from 'yargs';
import { install } from './scripts';
import healthChecks from './utils/healthChecks';

yargs // eslint-disable-line
  .help()
  .scriptName('ai2jsx')

  // New
  .command('install [destination]', 'Installs ai2jsx into your installation of Adobe Illustrator', (yargs) => {
    yargs
      .positional('destination', {
        alias: 'd',
        describe: 'Installation destination',
        type: 'string',
        default: '/Applications/Adobe Illustrator CC 2018/Presets.localized/en_US/Scripts',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function(args) {
    if (args.verbose) {
      await healthChecks();
    }

    await install(args);
  })
  .argv;
