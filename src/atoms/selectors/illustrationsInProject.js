import { selectorFamily } from 'recoil';
import illustrationEntities from './illustrationsList';
import idToSlugs from '../../utils/ids/idToSlugs';

/**
 * All the illustrations in a given project
 * @type {selectorFamily}
 */
const illustrationsInProject = selectorFamily({
  key: 'illustrationsInProject',
  get: (projectId) => ({ get }) => {
    const illustrations = get(illustrationEntities);

    return illustrations
      .filter((id) => {
        const slugs = idToSlugs(id);
        return slugs.project === projectId;
      });
  },
});
illustrationsInProject.key = 'illustrationsInProject';

export default illustrationsInProject;
