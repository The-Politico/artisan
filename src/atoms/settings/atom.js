import { atom } from 'recoil';
import atomSyncStoreEffect from '../../utils/store/atomSyncStoreEffect';
import read from './read';

const KEY = 'settings';

/**
 * The data for the user's settings
 * @type {atom}
 */
const settingsAtom = atom({
  key: KEY,
  default: read(),
  effects: [
    atomSyncStoreEffect({
      store: 'settings',
      read,
      write: true,
    }),
  ],
});

export default settingsAtom;
