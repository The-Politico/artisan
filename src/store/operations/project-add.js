import { projects, store } from '../init';

/**
 * Add a project to the store's projects array
 * and give it an entry in the store.
 * @param {String} projectName Name of the project entered by user
 * @param {Object} [opts]
 * @param {String} [opts.isUploaded]
 * @param {String} [opts.isPublished]
 * @param {String} [opts.lastUploaded]
 * @returns
 */
export async function addProject(
  projectName,
  { isUploaded, isPublished, lastUploaded } = {},
) {
  const projectsArr = await store.get('projects');

  const projectSlug = projectName.toLowerCase().replaceAll(' ', '-');

  if (projectSlug === 'projects') {
    throw new Error('Project name cannot be `projects`');
  }

  const projectEntry = await projects.get(projectSlug);

  if (projectEntry) {
    throw new Error('Project name already exists. Slugs must be unique');
  }

  await projects.set(projectSlug, {
    isUploaded: isUploaded || false,
    isPublished: isPublished || false,
    lastUploaded: lastUploaded || null,
    name: projectName,
    slug: projectSlug,
    illustrations: [],
  });

  if (projectsArr) {
    await store.set('projects', [...projectsArr, projectSlug]);
  } else {
    await store.set('projects', [projectSlug]);
  }

  await store.save();
  await projects.save();

  return projects.get(projectSlug);
}
