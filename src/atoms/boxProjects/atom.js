import { atom } from 'recoil';
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
      const intId = setInterval(async () => {
        console.log('Fetching folder list again');
        const data = await read();
        setSelf(data);
      }, 60000);
      return () => clearInterval(intId);
    },
  ],
});

export default boxprojectsAtom;
