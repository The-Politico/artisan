import getIllustrationStatus
  from '../../actions/illustrations/getIllustrationStatus';
import ids from '../../utils/ids';

/**
 * Gets the status of a given entity
 * @param {string} id - The ID of the entity
 * @returns {string} - The status
 */
export default async function onReadStatus(id) {
  if (ids.isProject(id)) {
    // TODO: Error Handling
    throw new Error(
      'Cannot read project status through atom, '
      + 'use selector instead',
    );
  }

  return getIllustrationStatus(id);
}
