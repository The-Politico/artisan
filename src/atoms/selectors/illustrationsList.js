import { selector } from 'recoil';
import entitiesAtom from '../entities/atom';
import isProjectSlug from '../../utils/ids/isProjectSlug';

/**
 * All entity IDs that are illustrations
 * @type {selector}
 */
const illustrationsList = selector({
  key: 'illustrationsList',
  get: ({ get }) => {
    const entites = get(entitiesAtom);
    return entites.filter((id) => !isProjectSlug(id));
  },
});

export default illustrationsList;
