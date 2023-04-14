import { atomFamily } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { TYPE_ENTITY_STATUS } from '../../constants/types';

/**
 * The current status of a given entity
 * @type {atomFamily}
 */
const statusAtomFamily = atomFamily({
  key: 'status',
  default: 'STATUS_UNKNOWN',
  effects: (id) => ([
    syncEffect({
      itemKey: `status__${id}`,
      storeKey: 'store',
      refine: TYPE_ENTITY_STATUS,
    }),
  ]),
});
statusAtomFamily.key = 'status';

export default statusAtomFamily;
