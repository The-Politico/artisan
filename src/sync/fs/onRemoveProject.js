/* eslint-disable */
/* TODO: FS Sync: Ignore this file for now */

import store from '../../store';
import getProjectInfoFromSlug from '../../utils/store/getProjectInfoFromSlug';
import getIllosInProject from '../../utils/store/getIllosInProject';

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
  // const projectInfo = await getProjectInfoFromSlug(projectSlug);

  // if (!projectInfo) {
  //   // The folder was never properly added to the entity
  //   return;
  // }

  // // Remove the version from illustrations in the project
  // const illustrations = await getIllosInProject(projectInfo.id);
  // const illoChanges = illustrations.reduce((acc, [illoId, illoInfo]) => {
  //   acc[illoId] = {
  //     ...illoInfo,
  //     version: null,
  //     lastUploadedVersion: null,
  //   };

  //   return acc;
  // }, {});

  // await store.illustrations.set(illoChanges);
}
