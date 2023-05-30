import { atom } from 'recoil';

const KEY = 'project';

/**
 * The project currently being viewed by a user
 * @type {atom}
 */
const activeProjectAtom = atom({
  key: KEY,
  default: undefined,
});

export default activeProjectAtom;
