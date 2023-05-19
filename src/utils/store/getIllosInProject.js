import store from '../../store';

/**
 * Get illustrations in a project
 *
 * @param {string} projectId - The unique identifier of the project
 * @returns {Promise<Array|undefined>} A promise that resolves with an array of
 * illustrations belonging to the specified project. If no projectId is
 * provided, the promise resolves with 'undefined'.
 */
export default async function getIllosInProject(projectId) {
  if (!projectId) {
    return undefined;
  }

  const entities = await store.illustrations.get();
  return entities
    .filter(
      ([, entity]) => entity.project === projectId,
    );
}
