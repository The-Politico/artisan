import { atom } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { TYPE_PREVIEW_STORE } from '../../constants/types';

/**
 * Represents the data for an active (or inactive) preview
 * @type {atom}
 */
const previewAtom = atom({
  key: 'preview',
  default: {},
  effects: [
    syncEffect({
      itemKey: 'preview',
      storeKey: 'store',
      refine: TYPE_PREVIEW_STORE,
    }),
  ],
});

export default previewAtom;
