import { selectorFamily } from 'recoil';
import illustrationsInProjectSelector from './illustrationsInProject';
import {
  STATUS_PROJECT_DRAFT,
  STATUS_PROJECT_PUBLISHED,
  STATUS_PROJECT_CHANGES,
  STATUS_PROJECT_UNKNOWN,
} from '../../constants/statuses';
import illustrationDetail from '../illustrationDetail/atom';

/**
 * Gets published status of a project
 */
const projectPublishedStatus = selectorFamily({
  key: 'projectPublishedStatus',
  get:
    (projectId) => ({ get }) => {
      const illosProjectIds = get(
        illustrationsInProjectSelector(projectId),
      );

      const illos = illosProjectIds.map((id) => get(illustrationDetail(id)));

      if (illos.length <= 0) {
        throw new Error(`No illustrations found for project ${projectId}`);
      }

      // None of its illustrations have lastPublished time
      if (illos.every((value) => value.lastPublished == null)) {
        return STATUS_PROJECT_DRAFT;
      }

      // lastPublished time after
      // the lastGenerated time for all it’s illustrations
      if (
        illos.every(
          (value) => value.lastPublished > value.lastGenerated,
        )
      ) {
        return STATUS_PROJECT_PUBLISHED;
      }

      // lastPublished time before the lastGenerated time in
      // at least one of its illustrations OR some illustrations
      // have lastPublished while others don’t
      const testForSome = (d) => {
        const generatedAfterPub = d.lastGenerated > d.lastPublished;
        const notPublished = d.lastPublished == null;
        return generatedAfterPub || notPublished;
      };
      if (illos.some(testForSome)) {
        return STATUS_PROJECT_CHANGES;
      }

      return STATUS_PROJECT_UNKNOWN;
    },
});

export default projectPublishedStatus;
