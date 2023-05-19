import { atom } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { TYPE_ILLUSTRATION_ID_COLLECTION } from '../../constants/types';

/**
 * Represents the list of entities in existence
 * @type {atom}
 */
export default atom({
  key: 'entities',
  default: [],
  effects: [
    syncEffect({
      itemKey: 'entities',
      storeKey: 'store',
      refine: TYPE_ILLUSTRATION_ID_COLLECTION,
    }),
  ],
});
