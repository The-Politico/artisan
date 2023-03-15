import omit from 'lodash/omit';
import store from '../../store';
import getProjectInfoFromSlug from '../../utils/store/getProjectInfoFromSlug';

/**
 * Updates the project data in the entity in the store to reflect
 * that the project is no longer downloaded
 *
 * @param {Object} options - The options for removing a project.
 * @param {string} options.projectSlug - The slug of the project to remove.
 *
 * @returns {Promise<void>} - A Promise that resolves when the project
 *  is removed.
 */
export default async function onRemoveProject({ projectSlug }) {
  console.log('Remove Project:', projectSlug);

  const projectInfo = await getProjectInfoFromSlug(projectSlug);

  if (!projectInfo) {
    // The folder was never properly added to the entity
    return;
  }

  await store.entities.set({
    [projectInfo.id]: {
      ...omit(projectInfo, ['version', 'healthy', 'illustrations']),
    },
  });
}
