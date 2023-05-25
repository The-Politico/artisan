import getPublishedStatus from '../../actions/projects/getPublishedStatus';

/**
 * Gets the publish status of a given project
 * @param {string} id - The ID of the project
 * @returns {string} - The status
 */
export default async function onReadPublishedStatus(id) {
  return getPublishedStatus(id);
}
