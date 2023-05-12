import { selector } from 'recoil';
import entitiesAtom from '../entities/atom';
import getProjectId from '../../utils/ids/getProjectId';

/**
 * All entity slugs that are projects
 * @type {selector}
 */
const projectsList = selector({
  key: 'projectsList',
  get: ({ get }) => {
    const entites = get(entitiesAtom);

    const projectSet = entites.reduce((acc, id) => {
      const project = getProjectId(id);
      acc.add(project);
      return acc;
    }, new Set());

    return Array.from(projectSet);
  },
});

export default projectsList;
