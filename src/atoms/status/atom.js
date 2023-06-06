import { atomFamily } from 'recoil';
import { STATUS_UNKNOWN } from '../../constants/statuses';
import atomSyncStoreEffect from '../../utils/store/atomSyncStoreEffect';
import atomSyncFsEffect from '../../utils/fs/atomSyncFsEffect';
import read from './read';

const KEY = 'status';

/**
 * The current status of a given entity
 * @type {atomFamily}
 */
const statusAtomFamily = atomFamily({
  key: KEY,
  default: STATUS_UNKNOWN,
  effects: (id) => ([
    atomSyncStoreEffect({
      store: 'illustrations',
      read: () => read(id),
    }),
    atomSyncFsEffect({
      id,
      read: () => read(id),
    }),
  ]),
});
statusAtomFamily.key = KEY;

export default statusAtomFamily;
