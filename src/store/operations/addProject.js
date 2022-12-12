import slugify from '../../utils/text/slugify';
import { PROJECTS, STORE } from '../init';
import { PROJECTS_LIST_NAME } from '../constants';
import validProjectSlug from '../verification/validProjectSlug';

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
  {
    isUploaded,
    isPublished,
    lastUploaded,
    method,
  } = {},
) {
  const projectsArr = await STORE.get(PROJECTS_LIST_NAME);

  const projectSlug = slugify(projectName);

  await validProjectSlug(projectSlug, { method });

  const newProjectConfig = {
    isUploaded: isUploaded || false,
    isPublished: isPublished || false,
    lastUploaded: lastUploaded || null,
    name: projectName,
    slug: projectSlug,
    illustrations: [],
  };

  await PROJECTS.set(projectSlug, newProjectConfig);

  if (projectsArr) {
    await STORE.set(PROJECTS_LIST_NAME, [...projectsArr, projectSlug]);
  } else {
    await STORE.set(PROJECTS_LIST_NAME, [projectSlug]);
  }

  await STORE.save();
  await PROJECTS.save();

  return PROJECTS.get(projectSlug);
}
