import { selector } from 'recoil';
import entitiesAtom from '../entities/atom';

/**
 * All entity IDs that are illustrations
 * @type {selector}
 */
const illustrationsList = selector({
  key: 'illustrationsList',
  get: ({ get }) => {
    const entites = get(entitiesAtom);
    return entites.filter((id) => id[0] === 'I');
  },
});

export default illustrationsList;
