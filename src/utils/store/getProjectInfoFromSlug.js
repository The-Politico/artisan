import store from '../../store';

/**
 * Returns the data for an illustration with the given slug in a given project.
 * @param {string} projectSlug - The unique slug for the project.
 *
 * @returns {Promise<object|undefined>} - The data for the illustration,
 *  or undefined if not found.
 */
export default async function getProjectInfoFromSlug(projectSlug) {
  const entities = await store.entities.get();
  const projectEntity = entities
    .find(([, entity]) => entity.slug === projectSlug);

  return projectEntity ? projectEntity[1] : undefined;
}
