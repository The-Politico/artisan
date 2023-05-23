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

  if (illustrations) {

  }
}
