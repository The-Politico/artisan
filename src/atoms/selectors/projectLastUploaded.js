import { selectorFamily } from 'recoil';
import illustrationsInProjectSelector from './illustrationsInProject';
import illustrationDetailAtom from '../illustrationDetail/atom';

const KEY = 'projectLastUploaded';

/**
 * @deprecated until archive is implemented
 * The last time any of a project's illustration's
 * were last uploaded
 * @type {selectorFamily}
 */
const projectLastUploaded = selectorFamily({
  key: KEY,
  get: (projectId) => ({ get }) => {
    const illustrationsInProject = get(
      illustrationsInProjectSelector(projectId),
    );

    const illustrationsLastUploaded = illustrationsInProject
      .map((illoId) => {
        const illoDetails = get(illustrationDetailAtom(illoId));
        return illoDetails.lastUploadedDate;
      })
      .filter((i) => i)
      .sort((a, b) => a.getTime() - b.getTime());

    return illustrationsLastUploaded[0];
  },
});
projectLastUploaded.key = KEY;

export default projectLastUploaded;
