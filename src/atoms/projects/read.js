import store from '../../store';

/**
 * Gets the data for a project
 * @function
 * @returns {Object}
 */
export default async function onReadProject(projectId) {
  return store.entities.get(projectId);
}
