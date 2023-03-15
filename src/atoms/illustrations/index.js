import atom from './atom';

import onReadEntities from './sync/read';
import onWriteEntities from './sync/write';

export default {
  atom,

  sync: {
    onRead: onReadEntities,
    onWrite: onWriteEntities,
  },
};
