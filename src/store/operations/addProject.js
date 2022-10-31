import { PROJECTS, STORE } from '../init';
import { PROJECTS_LIST_NAME } from '../constants';
import {
  RESRVED_PROJECT_NAME_ERROR,
  PROJECT_NAME_EXISTS_ERROR,
} from '../../errors/store';

/**
 * Add a project to the store's projects array
 * and give it an entry in the store.
 * @param {String} projectName Name of the project entered by user
 * @param {Object} [opts]
 * @param {String} [opts.isUploaded]
 * @param {String} [opts.isPublished]
 * @param {String} [opts.lastUploaded]
 * @returns {Promise<import('../types').ProjectDetails | null>}
 * Project detail object
 */
export default async function addProject(
  projectName,
  { isUploaded, isPublished, lastUploaded } = {},
) {
  const projectsArr = await STORE.get(PROJECTS_LIST_NAME);

  const projectSlug = projectName.toLowerCase().replaceAll(' ', '-');

  if (projectSlug === PROJECTS_LIST_NAME) {
    throw RESRVED_PROJECT_NAME_ERROR;
  }

  const projectEntry = await PROJECTS.get(projectSlug);

  if (projectEntry) {
    throw PROJECT_NAME_EXISTS_ERROR;
  }

  await PROJECTS.set(projectSlug, {
    isUploaded: isUploaded || false,
    isPublished: isPublished || false,
    lastUploaded: lastUploaded || null,
    name: projectName,
    slug: projectSlug,
    illustrations: [],
  });

  if (projectsArr) {
    await STORE.set(PROJECTS_LIST_NAME, [...projectsArr, projectSlug]);
  } else {
    await STORE.set(PROJECTS_LIST_NAME, [projectSlug]);
  }

  await STORE.save();
  await PROJECTS.save();

  return PROJECTS.get(projectSlug);
}
