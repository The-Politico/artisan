import { projects } from '../init';

/**
 * Update a project's upload state and last uploaded timestamp
 * @param {String} projectSlug Kebab-case project name string
 * @param {Object} opts
 * @param {Boolean} [opts.isUploaded] Set to "true" if project
 *  has been backed up
 * @param {Boolean} [opts.isPublished] Set to "true" if project
 *  has been published
 * @param {String} [opts.lastUploaded] ISO date string
 */
export async function updateProject(
  projectSlug,
  { isUploaded = false, isPublished = false, lastUploaded = null } = {},
) {
  const projectEntry = await projects.get(projectSlug);

  if (projectEntry) {
    await projects.set(projectSlug, {
      ...projectEntry,
      isUploaded,
      isPublished,
      lastUploaded,
    });

    await projects.svate();
  } else {
    throw new Error(`No such project exists for: ${projectSlug}`);
  }
}
