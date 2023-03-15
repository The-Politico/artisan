import store from '../../store';

/**
 * Returns the data for an illustration with the given slug in a given project.
 * @param {string} illoSlug - The unique slug for the illustration.
 * @param {string} projectId - The unique identifier for the project.
 *
 * @returns {Promise<object|undefined>} - The data for the illustration,
 *  or undefined if not found.
 */
export default async function getIlloInfoFromSlug(illoSlug, projectId) {
  if (!illoSlug || !projectId) {
    return undefined;
  }

  const entities = await store.entities.get();
  const illoEntity = entities
    .find(
      ([, entity]) => entity.slug === illoSlug
        && entity.project === projectId,
    );

  return illoEntity ? illoEntity[1] : undefined;
}
