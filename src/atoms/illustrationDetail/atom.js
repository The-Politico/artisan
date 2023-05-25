import { atomFamily } from 'recoil';
import read from './read';
import atomSyncStoreEffect from '../../utils/store/atomSyncStoreEffect';

const KEY = 'illustrationDetail';

/**
 * Details about an illustration
 * @type {atomFamily}
 */
const illustrationsAtomFamily = atomFamily({
  key: KEY,
  default: (id) => read(id),
  effects: (id) => ([
    atomSyncStoreEffect({
      store: 'illustrations',
      read: () => read(id),
    }),
  ]),
});

illustrationsAtomFamily.key = KEY;

export default illustrationsAtomFamily;
