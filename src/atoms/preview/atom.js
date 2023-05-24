import { atom } from 'recoil';
import atomSyncStoreEffect from '../../utils/store/atomSyncStoreEffect';
import read from './read';

const KEY = 'preview';

/**
 * The data for an active (or inactive) preview
 * @type {atom}
 */
const previewAtom = atom({
  key: KEY,
  default: read(),
  effects: [
    atomSyncStoreEffect({
      store: 'preview',
      read,
      write: true,
    }),
  ],
});

export default previewAtom;
