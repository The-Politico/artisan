import { atomFamily } from 'recoil';
import { syncEffect } from 'recoil-sync';
import { TYPE_PROJECT_STORE_ITEM } from '../../constants/types';

/**
 * Represents the data for a project entity
 * @type {atomFamily}
 */
const projectsAtomFamily = atomFamily({
  key: 'projects',
  default: {},
  effects: (id) => ([
    syncEffect({
      itemKey: `projects__${id}`,
      storeKey: 'store',
      refine: TYPE_PROJECT_STORE_ITEM,
    }),
  ]),
});

projectsAtomFamily.key = 'projects';
export default projectsAtomFamily;
