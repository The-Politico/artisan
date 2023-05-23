import { atom } from 'recoil';
import read from './read';
import atomSyncEffect from '../../utils/store/atomSyncEffect';

const KEY = 'illustrations';

/**
 * Represents the list of entities in existence
 * @type {atom}
 */
export default atom({
  key: KEY,
  default: read.selector,
  effects: [
    atomSyncEffect({
      name: KEY,
      store: 'illustrations',
      fetch: read.fetch,
    }),
  ],
});
