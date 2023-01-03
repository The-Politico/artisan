import { selectorFamily } from 'recoil';
import illustrationEntities from '../../entities/selectors/illustrations';
import illustrationAtoms from '../../illustrations/atom';

const illustrationsInProject = selectorFamily({
  key: 'entities.illustrationsInProject',
  get: (projectId) => ({ get }) => {
    const illustrations = get(illustrationEntities);
    const illustrationInfo = illustrations
      .map((id) => get(illustrationAtoms(id)))
      .filter(({ project }) => project === projectId)
      .map(({ id }) => id);

    return illustrationInfo;
  },
});

export default illustrationsInProject;
