import yargs from 'yargs';
import healthChecks from './utils/healthChecks';
import setVerboseMode from './utils/setVerboseMode';

import {
  activate,
  deactivate,
  install,
  newIndex,
  open,
  preview,
  publish,
  start,
  which
} from './scripts';

yargs // eslint-disable-line
  .help()
  .scriptName('ai2jsx')

  // Install
  .command('install [illustrator]', 'Installs ai2jsx into your installation of Adobe Illustrator', (yargs) => {
    yargs
      .positional('illustrator', {
        alias: 'i',
        describe: 'Adobe Illustrator app location',
        type: 'string',
        default: '/Applications/Adobe Illustrator 2020/Adobe Illustrator.app',
      })
      .option('destination', {
        alias: 'd',
        describe: 'Adobe Illustrator scripts location',
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

    await install(args);
  })

  // New
  .command('new [type]', 'Creates something new', (yargs) => {
    yargs
      .positional('type', {
        alias: 't',
        describe: 'What to create',
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

    await newIndex(args);
  })

  // Open
  .command('open [illustration]', 'Open an illustration', (yargs) => {
    yargs
      .positional('illustration', {
        alias: 'i',
        describe: 'The name of the illustration',
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

    await open(args);
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

  // Preview
  .command('preview', 'Publish a preview to the web', (yargs) => {
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
    await preview(args);
  })

  // Publish
  .command('publish', 'Publish the embed live', (yargs) => {
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
    await publish(args);
  })

  // Start
  .command('start', 'Start a development server', (yargs) => {
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
    await start(args);
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

  .argv;
