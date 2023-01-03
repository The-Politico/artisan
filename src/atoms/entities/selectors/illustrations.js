import { selector } from 'recoil';
import entitiesAtom from '../atom';

const illustrationEntitySelector = selector({
  key: 'entities.illustrationEntitySelector',
  get: ({ get }) => {
    const entites = get(entitiesAtom);
    return entites.filter((id) => id[0] === 'I');
  },
});

export default illustrationEntitySelector;
