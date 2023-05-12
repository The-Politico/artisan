import getIllustrationStatus
  from '../../utils/illustrations/getIllustrationStatus';
import getProjectStatus from '../../utils/project/getProjectStatus';
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
