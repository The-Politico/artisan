import yargs from 'yargs';
import healthChecks from './utils/healthChecks';
import setVerboseMode from './utils/setVerboseMode';

import {
  activate,
  deactivate,
  install,
  newProject,
  which
} from './scripts';

yargs // eslint-disable-line
  .help()
  .scriptName('ai2jsx')

  // Install
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
    setVerboseMode(args.verbose);
    await healthChecks();

    await install(args);
  })

  // New
  .command('new project', 'Creates a new embed project', (yargs) => {
    yargs
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function(args) {
    setVerboseMode(args.verbose);
    await healthChecks();

    await newProject(args);
  })

  // Activate
  .command('activate [project]', 'Sets a project to be active', (yargs) => {
    yargs
      .positional('project', {
        alias: 'p',
        describe: 'The name of the project to activate',
        type: 'string',
      })
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function(args) {
    setVerboseMode(args.verbose);
    await healthChecks();
    await activate(args);
  })

  // Deactivate
  .command('deactivate', 'Sets no project to be active', (yargs) => {
    yargs
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function(args) {
    setVerboseMode(args.verbose);
    await healthChecks();
    await deactivate(args);
  })

  // Which
  .command('which', 'Find out what the active project is', (yargs) => {
    yargs
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function(args) {
    setVerboseMode(args.verbose);
    await healthChecks();
    await which(args);
  })

  // Test
  .command('test', 'Creates a new embed project', (yargs) => {
    yargs
      .option('verbose', {
        alias: 'v',
        describe: 'Log to the console',
        type: 'boolean',
        default: true,
      });
  }, async function(args) {
    console.log(process.pid);
    require('child_process').exec('echo tty', {}, (err, data) => {
      console.log('data', data);
    });
  })

  .argv;
