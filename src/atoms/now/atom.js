/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

/**
 * Atom to keep track of the current time
 */
const nowAtom = atom({
  key: 'now',
  default: new Date(0),
});

export default nowAtom;
