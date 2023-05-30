import { selector } from 'recoil';
import illustrationsAtom from '../illustrations/atom';
import ids from '../../utils/ids';

const KEY = 'projectsList';

/**
 * All unique project slugs found in illustrations
 * @type {selector}
 */
const projectsList = selector({
  key: KEY,
  get: ({ get }) => {
    const entites = get(illustrationsAtom);

    const projectSet = entites.reduce((acc, id) => {
      const { project: projectId } = ids.parse(id);
      acc.add(projectId);
      return acc;
    }, new Set());

    return Array.from(projectSet);
  },
});

export default projectsList;
