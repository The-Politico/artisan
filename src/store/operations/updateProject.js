import { PROJECTS } from '../init';
import {
  NO_PROJECT_EXISTS_ERROR,
} from '../../errors/store';

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
export default async function updateProject(
  projectSlug,
  {
    isUploaded = false,
    isPublished = false,
    lastUploaded = null,
  } = {},
) {
  const projectEntry = await PROJECTS.get(projectSlug);

  if (!projectEntry) {
    throw NO_PROJECT_EXISTS_ERROR;
  }

  await PROJECTS.set(projectSlug, {
    ...projectEntry,
    isUploaded,
    isPublished,
    lastUploaded,
  });

  await PROJECTS.save();

  return PROJECTS.get(projectSlug);
}
