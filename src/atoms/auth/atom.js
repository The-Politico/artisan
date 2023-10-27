import { atom } from 'recoil';
import atomSyncStoreEffect from '../../utils/store/atomSyncStoreEffect';
import read from './read';

/**
 * The data for the user's settings
 * @type {atom}
 */
const authAtom = atom({
  key: 'auth',
  default: read(),
  effects: [
    atomSyncStoreEffect({
      store: 'auth',
      read,
      write: true,
    }),
  ],
});

export default authAtom;
