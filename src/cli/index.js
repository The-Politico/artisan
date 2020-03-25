import yargs from 'yargs';

import './scripts/activate/cmd';
import './scripts/code/cmd';
import './scripts/conf/cmd';
import './scripts/deactivate/cmd';
import './scripts/dir/cmd';
import './scripts/install/cmd';
import './scripts/new/cmd';
import './scripts/open/cmd';
import './scripts/preview/cmd';
import './scripts/publish/cmd';
import './scripts/start/cmd';
import './scripts/which/cmd';

yargs // eslint-disable-line
  .help()
  .scriptName('ai2jsx')
  .argv;
