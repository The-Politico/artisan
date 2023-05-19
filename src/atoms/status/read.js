import getIllustrationStatus
  from '../../actions/illustrations/getIllustrationStatus';
import getProjectStatus from '../../actions/projects/getProjectStatus';
import isProjectSlug from '../../utils/ids/isProjectSlug';

/**
 * Gets the status of a given entity
 * @param {string} id - The ID of the entity
 * @returns {string} - The status
 */
export default async function onReadStatus(id) {
  if (isProjectSlug(id)) {
    return getProjectStatus(id);
  }

  return getIllustrationStatus(id);
}
