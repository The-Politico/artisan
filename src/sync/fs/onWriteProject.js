import { v4 as uuidv4 } from 'uuid';
import store from '../../store';
import titleify from '../../utils/text/titleify';
import fetchProjectMeta from '../../utils/archive/fetchProjectMeta';
import getProjectInfoFromSlug from '../../utils/store/getProjectInfoFromSlug';

import postProjectMeta from '../../utils/archive/postProjectMeta';

/**
 * Creates a new project in the store if it does not already exist.
 * If it already exists, updates the existing project with metadata
 * from the archive.
 *
 * @param {Object} options - The options for creating a new project.
 * @param {string} options.projectSlug - The slug of the project to create.
 *
 * @returns {Promise<void>} - A Promise that resolves when the project is
 * created or updated.
 */
export default async function onWriteProject({ projectSlug }) {
  if (projectSlug.startsWith('_') || projectSlug === 'untitled folder') {
    return;
  }

  const projectInfo = await getProjectInfoFromSlug(projectSlug);

  if (projectInfo) {
    // The project is being downloaded (or already exists)
    const existingProjectMeta = await fetchProjectMeta(
      projectSlug,
      { skipIllustrations: true },
    );
    await store.entities.set({
      [existingProjectMeta.id]: {
        ...existingProjectMeta,
        publicUrl: undefined,
      },
    });
  } else {
    // The project is new
    const name = titleify(projectSlug);
    const id = `P-${uuidv4()}`;

    await postProjectMeta(id, {
      name,
      slug: projectSlug,
    });

    await store.entities.refreshId(id);
  }
}
