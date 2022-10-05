import { initStore } from '../init';

const store = initStore();

/**
 * Add a project to the store's projects array
 * and give it an entry in the store.
 * @param {String} projectName Name of the project entered by user
 * @returns
 */
export async function addProject(projectName) {
  const projectsArr = await store.get('projects');

  const projectSlug = projectName.toLowerCase().replaceAll(' ', '-');

  const projectEntry = await store.get(projectSlug);

  if (!projectEntry) {
    await store.set(projectSlug, {
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
  } else {
    throw new Error('Project name already exists! Slugs must be unique');
  }

  return store.get(projectSlug);
}

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
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    await store.set(projectSlug, {
      ...projectEntry,
      isUploaded,
      isPublished,
      lastUploaded,
    });
  } else {
    throw new Error(`No such project exists for: ${projectSlug}`);
  }
}

/**
 * Remove a project from the store.
 * This includes removing the entry from the `projects` array store.
 * @param {String} projectsSlug Kebab-case project name string
 */
export async function removeProject(projectsSlug) {
  const projectsArr = await store.get('projects');
  const projectEntry = await store.get(projectsSlug);

  if (projectEntry) {
    await store.delete(projectsSlug);

    if (projectsArr) {
      await store.set(
        'projects',
        projectsArr.filter((p) => p !== projectsSlug),
      );
    }
  }

  await store.save();
}
