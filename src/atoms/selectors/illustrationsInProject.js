import { selectorFamily } from 'recoil';
import entities from '../entities/atom';
import ids from '../../utils/ids';

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
        const { project: compareId } = ids.parse(id);
        return compareId === projectId;
      });
  },
});
illustrationsInProject.key = 'illustrationsInProject';

export default illustrationsInProject;
