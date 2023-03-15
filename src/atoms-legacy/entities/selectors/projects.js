import { selector } from 'recoil';
import entitiesAtom from '../atom';

const projectEntitySelector = selector({
  key: 'entities.projectEntitySelector',
  get: ({ get }) => {
    const entites = get(entitiesAtom);
    return entites.filter((id) => id[0] === 'P');
  },
});

export default projectEntitySelector;
