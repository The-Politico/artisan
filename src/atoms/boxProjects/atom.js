import { atom } from 'recoil';
import read from './read';
import { subscribeToEvents } from '../../box-api/sync';

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
      // subscribeToEvents(read, setSelf);
    },
  ],
});

export default boxprojectsAtom;
