import { log } from '../console';
import readConf from './readConf';

export default async() => {
  let loc;
  const conf = await readConf();

  if (!conf.illustratorLoc) {
    log('No Illustrator installation found. Try running the "install" again.', 'error');
  } else {
    loc = conf.illustratorLoc;
  }

  return loc;
};
