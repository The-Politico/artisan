import {
  STATUS_PROJECT_DRAFT,
  STATUS_PROJECT_PUBLISHED,
  STATUS_PROJECT_CHANGES,
} from '../../constants/statuses';
import getIllosInProject from '../../utils/store/getIllosInProject';

/**
 * Gets published status of a projec to read to associated atom
 * @param {string} id Parsed project ID
 */
export default async function getPublishedStatus(id) {
  const illustrations = await getIllosInProject(id);

  if (illustrations.length <= 0) {
    throw new Error(`No illustrations found for project ${id}`);
  }

  // None of it’s illustrations have lastPublished time
  if (illustrations.every(([, value]) => value.lastPublished == null)) {
    return STATUS_PROJECT_DRAFT;
  }

  // lastPublished time after the lastGenerated time for all it’s illustrations
  if (
    illustrations.every(
      ([, value]) => value.lastPublished > value.lastGenerated,
    )
  ) {
    return STATUS_PROJECT_PUBLISHED;
  }

  // lastPublished time before the lastGenerated time in
  // at least one of its illustrations OR some illustrations
  // have lastPublished while others don’t
  const testForSome = ([, d]) => {
    const generatedAfterPub = d.lastGenerated > d.lastPublished;
    const notPublished = d.lastPublished == null;
    return generatedAfterPub || notPublished;
  };
  if (illustrations.some(testForSome)) {
    return STATUS_PROJECT_CHANGES;
  }

  // Else return draft
  return STATUS_PROJECT_DRAFT;
}
