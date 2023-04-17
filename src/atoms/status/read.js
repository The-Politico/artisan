import getIllustrationStatus
  from '../../utils/illustrations/getIllustrationStatus';
import getProjectStatus from '../../utils/project/getProjectStatus';

/**
 * Gets the status of a given entity
 * @param {string} id - The ID of the entity
 * @returns {string} - The status
 */
export default async function onReadStatus(id) {
  if (id.startsWith('P-')) {
    return getProjectStatus(id);
  }

  if (id.startsWith('I-')) {
    return getIllustrationStatus(id);
  }

  throw new Error(`Error: On Read Status: Invalid ID: ${id}`);
}
