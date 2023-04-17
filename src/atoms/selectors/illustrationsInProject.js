import { selectorFamily } from 'recoil';
import illustrationEntities from './illustrationsList';
import illustrationAtoms from '../illustrations/atom';

/**
 * All the illustrations in a given project
 * @type {selectorFamily}
 */
const illustrationsInProject = selectorFamily({
  key: 'illustrationsInProject',
  get: (projectId) => ({ get }) => {
    const illustrations = get(illustrationEntities);

    const illustrationInfo = illustrations
      .map((id) => get(illustrationAtoms(id)))
      .filter(({ project }) => project === projectId);

    return illustrationInfo;
  },
});
illustrationsInProject.key = 'illustrationsInProject';

export default illustrationsInProject;
