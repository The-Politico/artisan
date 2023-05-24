import { atomFamily } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { TYPE_ENTITY_STATUS } from '../../constants/types';

/**
 * The current status of a given entity
 * @type {atomFamily}
 */
const publishedStatusAtomFamily = atomFamily({
  key: 'published_status',
  default: 'STATUS_PROJECT_DRAFT',
  effects: (id) => ([
    syncEffect({
      itemKey: `published_status__${id}`,
      storeKey: 'store',
      refine: TYPE_ENTITY_STATUS,
    }),
  ]),
});
publishedStatusAtomFamily.key = 'published_status';

export default publishedStatusAtomFamily;
