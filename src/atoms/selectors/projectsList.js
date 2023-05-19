import { selector } from 'recoil';
import entitiesAtom from '../entities/atom';
import ids from '../../utils/ids';

/**
 * All unique project slugs found in illustrations
 * @type {selector}
 */
const projectsList = selector({
  key: 'projectsList',
  get: ({ get }) => {
    const entites = get(entitiesAtom);

    const projectSet = entites.reduce((acc, id) => {
      const { project: projectId } = ids.parse(id);
      acc.add(projectId);
      return acc;
    }, new Set());

    return Array.from(projectSet);
  },
});

export default projectsList;
