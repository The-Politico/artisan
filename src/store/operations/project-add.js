import { projects, store } from '../init';

/**
 * Add a project to the store's projects array
 * and give it an entry in the store.
 * @param {String} projectName Name of the project entered by user
 * @returns
 */
export async function addProject(projectName) {
  const projectsArr = await store.get('projects');

  const projectSlug = projectName.toLowerCase().replaceAll(' ', '-');

  if (projectSlug === 'projects') {
    throw new Error('Project name cannot be `projects`');
  }

  const projectEntry = await projects.get(projectSlug);

  if (!projectEntry) {
    await projects.set(projectSlug, {
      isUploaded: false,
      isPublished: false,
      lastUploaded: null,
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
  } else {
    throw new Error('Project name already exists. Slugs must be unique');
  }

  return projects.get(projectSlug);
}
