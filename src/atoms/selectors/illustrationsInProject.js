import { selectorFamily } from 'recoil';
import illustrationsAtom from '../illustrations/atom';
import ids from '../../utils/ids';

const KEY = 'illustrationsInProject';

/**
 * All the illustrations in a given project
 * @type {selectorFamily}
 */
const illustrationsInProject = selectorFamily({
  key: KEY,
  get: (projectId) => ({ get }) => {
    const illustrations = get(illustrationsAtom);

    return illustrations
      .filter((id) => {
        const { project: compareId } = ids.parse(id);
        return compareId === projectId;
      });
  },
});
illustrationsInProject.key = KEY;

export default illustrationsInProject;
