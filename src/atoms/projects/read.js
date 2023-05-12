import store from '../../store';

/**
 * Gets the data for a project
 * @function
 * @returns {Object}
 */
export default async function onReadProject(projectId) {
  const entities = await store.entities.get();
  const entitiesInProject = entities
    .filter(([, meta]) => meta.project === projectId);

  if (entitiesInProject.length > 0) {
    return {
      slug: projectId,
    };
  }

  return undefined;
}
