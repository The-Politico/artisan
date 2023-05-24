import getPublishedStatus from '../../actions/projects/getPublishedStatus';

/**
 * Gets the status of a given entity
 * @param {string} id - The ID of the entity
 * @returns {string} - The status
 */
export default async function onReadPublishedStatus(id) {
  return getPublishedStatus(id);
}
