import store from '../../store';

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
  // Don't think we need this anymore
  return;

  if (projectSlug.startsWith('_') || projectSlug === 'untitled folder') {
    return;
  }

  await store.entities.set({
    [projectSlug]: {
      slug: projectSlug,
    },
  });
}
