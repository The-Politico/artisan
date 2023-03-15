import store from '../../store';

/**
 * Writes new data to a project entity
 * @function
 * @param {Object} value - The data to update with
 * @param {String=} value.name - A new name
 * @param {String=} value.slug - A new slug
 * @param {String=} value.lastUpdated - A new last updated time
 * @param {String} projectId - The ID of the project to change
 * @returns {Promise}
 */
export default async function onWriteProject(value, projectId) {
  const baseEntityData = await store.entities.get(projectId);

  const change = {
    name: value.name,
    slug: value.slug,
    lastUpdated: new Date().toISOString(),
  };

  await store.entities.set({
    [projectId]: {
      ...baseEntityData,
      ...change,
    },
  });
}
