import keys from 'lodash/keys';

import readConf from './readConf';

export default async(aliveOnly = true) => {
  const conf = await readConf();
  return keys(conf.projects)
    .filter(p => {
      if (aliveOnly === true) {
        return conf.projects[p].status === 'alive';
      } else if (aliveOnly === 'archived') {
        return conf.projects[p].status !== 'alive';
      } else {
        return true;
      }
    });
};
