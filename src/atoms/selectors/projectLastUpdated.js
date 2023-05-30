import { selectorFamily } from 'recoil';
import illustrationsInProjectSelector from './illustrationsInProject';
import illustrationDetail from '../illustrationDetail/atom';
import publishedStatusSelector from './projectPublishedStatus';
import {
  STATUS_PROJECT_PUBLISHED,
  STATUS_PROJECT_CHANGES,
} from '../../constants/statuses';

/**
 * Gets the last updated time of a project
 * @return {string} Most-recent lastPublishedDate or lastGeneratedDate
 */
const projectLastUpdated = selectorFamily({
  key: 'projectLastUpdated',
  get:
    (projectId) => ({ get }) => {
      const illustrationsInProject = get(
        illustrationsInProjectSelector(projectId),
      );

      const publishedStatus = get(publishedStatusSelector(projectId));

      const dateValues = {
        [STATUS_PROJECT_PUBLISHED]: 'lastPublishedDate',
        [STATUS_PROJECT_CHANGES]: 'lastGeneratedDate',
      };

      const dateToUse = dateValues[publishedStatus];

      // If status isn't draft, return time
      return illustrationsInProject.reduce((lastUpdated, illoId) => {
        const illoDetails = get(illustrationDetail(illoId));
        const date = illoDetails[dateToUse];

        if (!lastUpdated) {
          return date;
        }

        if (!date) {
          return lastUpdated;
        }

        if (date > lastUpdated) {
          return date;
        }

        return lastUpdated;
      }, undefined);
    },
});

export default projectLastUpdated;
