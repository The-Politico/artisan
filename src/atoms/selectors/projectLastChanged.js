import { selectorFamily } from 'recoil';
import illustrationsInProjectSelector from './illustrationsInProject';
import illustrationAtom from '../illustrations/atom';
import pubStatusAtomFamily from '../publishedStatus/atom';

// Gets time to display in status dek based
// on the published status
const projectLastPublishedChanged = selectorFamily({
  key: 'projectLastPublishedChanged',
  get:
    (projectId) => ({ get }) => {
      const illustrationsInProject = get(
        illustrationsInProjectSelector(projectId),
      );

      const publishedStatus = get(pubStatusAtomFamily(projectId));

      const dateValues = {
        PROJECT_STATUS_PUBLISHED: 'lastPublished',
        PROJECT_STATUS_CHANGES: 'lastGenerated',
      };

      const dateToUse = dateValues[publishedStatus] || publishedStatus;

      // If stat isn't darft, return time
      if (dateToUse) {
        const illustrationsLastPubOrGen = illustrationsInProject
          .map((illoId) => {
            const illoDetails = get(illustrationAtom(illoId));
            return illoDetails[dateToUse];
          })
          .filter((i) => i)
          .sort((a, b) => a.getTime() - b.getTime());

        return illustrationsLastPubOrGen[0];
      }

      return undefined;
    },
});
projectLastPublishedChanged.key = 'projectLastPublishedChanged';

export default projectLastPublishedChanged;
