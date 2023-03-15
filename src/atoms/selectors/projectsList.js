import { selector } from 'recoil';
import entitiesAtom from '../entities/atom';

/**
 * All entity IDs that are projects
 * @type {selector}
 */
const projectsList = selector({
  key: 'projectsList',
  get: ({ get }) => {
    const entites = get(entitiesAtom);
    return entites.filter((id) => id[0] === 'P');
  },
});

export default projectsList;
