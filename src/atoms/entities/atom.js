import { atom } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { string, array } from '@recoiljs/refine';

export default atom({
  key: 'entities',
  default: [],
  effects: [
    syncEffect({
      itemKey: 'entities',
      storeKey: 'store',
      refine: array(string()),
    }),
  ],
});
