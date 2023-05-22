import getIllustrationStatus
  from '../../actions/illustrations/getIllustrationStatus';
import getProjectStatus from '../../actions/projects/getProjectStatus';
import ids from '../../utils/ids';

/**
 * Gets the status of a given entity
 * @param {string} id - The ID of the entity
 * @returns {string} - The status
 */
export default async function onReadStatus(id) {
  if (ids.isProject(id)) {
    return getProjectStatus(id);
  }

  return getIllustrationStatus(id);
}
