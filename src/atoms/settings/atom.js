import { atom } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { TYPE_SETTINGS_STORE } from '../../constants/types';

/**
 * Represents the data for the user's settings
 * @type {atom}
 */
const settingsAtom = atom({
  key: 'settings',
  default: {},
  effects: [
    syncEffect({
      itemKey: 'settings',
      storeKey: 'store',
      refine: TYPE_SETTINGS_STORE,
    }),
  ],
});

export default settingsAtom;
