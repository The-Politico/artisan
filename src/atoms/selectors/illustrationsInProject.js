import { selectorFamily } from 'recoil';
import entities from '../entities/atom';
import idToSlugs from '../../utils/ids/idToSlugs';

/**
 * All the illustrations in a given project
 * @type {selectorFamily}
 */
const illustrationsInProject = selectorFamily({
  key: 'illustrationsInProject',
  get: (projectId) => ({ get }) => {
    const illustrations = get(entities);

    return illustrations
      .filter((id) => {
        const slugs = idToSlugs(id);
        return slugs.project === projectId;
      });
  },
});
illustrationsInProject.key = 'illustrationsInProject';

export default illustrationsInProject;
