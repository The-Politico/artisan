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

    const sortedList = Array
      .from(projectSet)
      .sort((a, b) => a - b);

    return sortedList;
  },
});

export default projectsList;
