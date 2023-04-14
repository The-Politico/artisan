import { atom } from 'recoil';

/**
 * The project currently being viewed by a user
 * @type {atom}
 */
const activeProjectAtom = atom({
  key: 'activeProject',
  default: undefined,
});

export default activeProjectAtom;
