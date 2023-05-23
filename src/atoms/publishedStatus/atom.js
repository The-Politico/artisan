import { atomFamily } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { TYPE_ENTITY_STATUS } from '../../constants/types';

/**
 * The current status of a given entity
 * @type {atomFamily}
 */
const statusAtomFamily = atomFamily({
  key: 'published-status',
  default: 'STATUS_PROJECT_DRAFT',
  effects: (id) => ([
    syncEffect({
      itemKey: `published-status__${id}`,
      storeKey: 'store',
      refine: TYPE_ENTITY_STATUS,
    }),
  ]),
});
statusAtomFamily.key = 'published-status';

export default statusAtomFamily;
