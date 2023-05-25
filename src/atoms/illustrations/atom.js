import { atom } from 'recoil';
import read from './read';
import atomSyncStoreEffect from '../../utils/store/atomSyncStoreEffect';

const KEY = 'illustrations';

/**
 * The list of illustrations
 * @type {atom}
 */
const illustrationsAtom = atom({
  key: KEY,
  default: read(),
  effects: [
    atomSyncStoreEffect({
      store: 'illustrations',
      read,
    }),
  ],
});

export default illustrationsAtom;
