import { initStore } from '../init';

const store = initStore();

/**
 * Add a project to the store's projects array and give it an entry in the store
 * @param {String} projectName Name of the project entered by user
 */
export async function addProject(projectName) {
  const projectsArr = await store.get('projects');

  const projectSlug = projectName.toLowerCase().replaceAll(' ', '-');

  const projectEntry = await store.get(projectSlug);

  if (!projectEntry) {
    await store.set(projectSlug, {
      isUploaded: false,
      lastUploaded: null,
      name: projectName,
      slug: projectSlug,
      illustrations: [],
    });

    if (projectsArr) {
      await store.set('projects', [...projectsArr, projectSlug]);
    } else {
      console.log('making new', projectsArr);
      await store.set('projects', [projectSlug]);
    }

    await store.save();
  } else {
    throw new Error('Project name already exists! Slugs must be unique');
  }

  return store.get(projectSlug);
}

export async function updateProject(
  projectSlug,
  { isUploaded = false, lastUploaded = null },
) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    await store.set(projectSlug, {
      ...projectEntry,
      isUploaded,
      lastUploaded,
    });
  } else {
    throw new Error(`No such project exists for: ${projectSlug}`);
  }
}

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
