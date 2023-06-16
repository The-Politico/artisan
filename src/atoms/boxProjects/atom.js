import { atom } from 'recoil';
import atomSyncStoreEffect from '../../utils/store/atomSyncStoreEffect';
import read from './read';

const KEY = 'boxprojects';

/**
 * The list of illustrations
 * @type {atom}
 */
const boxprojectsAtom = atom({
  key: KEY,
  default: read(),
  effects: [
    ({ setSelf }) => {
      const nIntervId = setInterval(async () => {
        console.log('Fetching folder list again');
        const data = await read();
        setSelf(data);
      }, 15000);
    },
  ],
});

export default boxprojectsAtom;
