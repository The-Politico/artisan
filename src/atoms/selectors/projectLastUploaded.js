import { selectorFamily } from 'recoil';
import illustrationsInProjectSelector from './illustrationsInProject';
import illustrationAtom from '../illustrations/atom';

const projectLastUploaded = selectorFamily({
  key: 'projectLastUploaded',
  get: (projectId) => ({ get }) => {
    const illustrationsInProject = get(
      illustrationsInProjectSelector(projectId),
    );

    const illustrationsLastUploaded = illustrationsInProject
      .map((illoId) => {
        const illoDetails = get(illustrationAtom(illoId));
        return illoDetails.lastUploadedDate;
      })
      .filter((i) => i)
      .sort((a, b) => a.getTime() - b.getTime());

    return illustrationsLastUploaded[0];
  },
});
projectLastUploaded.key = 'projectLastUploaded';

export default projectLastUploaded;
