import { atomFamily } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { TYPE_ENTITY_STORE_ITEM } from '../../constants/types';

/**
 * Represents the data for an illustration entity
 * @type {atomFamily}
 */
const illustrationsAtomFamily = atomFamily({
  key: 'illustrations',
  default: {},
  effects: (id) => ([
    syncEffect({
      itemKey: `illustrations__${id}`,
      storeKey: 'store',
      refine: TYPE_ENTITY_STORE_ITEM,
    }),
  ]),
});

illustrationsAtomFamily.key = 'illustrations';

export default illustrationsAtomFamily;
