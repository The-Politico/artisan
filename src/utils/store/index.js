import { initStore } from './init';

const store = initStore();

/**
 * Update Artisan settings for author Name, Email and the Projects Folder
 * @param {Object} settings
 * @param {String} [settings.authorName]
 * @param {String} [settings.authorEmail]
 * @param {String} [settings.projectsFolder]
 */
export async function updateAppSettings({
  authorName,
  authorEmail,
  projectsFolder,
}) {
  await store.set('authorName', authorName);
  await store.set('authorEmail', authorEmail);
  await store.set('projectsFolder', projectsFolder);

  await store.save();

  return store.values();
}

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

export async function addIllustration(projectSlug, illustrationName) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const slug = illustrationName.toLowerCase().replaceAll(' ', '-');

    const newIllustration = {
      name: illustrationName,
      slug,
      publicURL: null,
    };

    await store.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illustrations, newIllustration],
    });

    return store.get(projectSlug);
  }
  return null;
}

export async function updateIllustrationURL(
  projectSlug,
  illustrationSlug,
  publicURL,
) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const illoMap = new Map(illustrations.map((d) => [d.slug, d]));
    const illoEntry = illoMap.get(illustrationSlug);

    if (!illoEntry) {
      throw new Error(`No such project exists for: ${illustrationSlug}`);
    }

    illoMap.set(illustrationSlug, {
      ...illoEntry,
      publicURL,
    });

    await store.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illoMap.values()],
    });

    return store.get(projectSlug);
  }

  throw new Error(`No such project exists for: ${projectSlug}`);
}

export async function removeIllustration(projectSlug, illustrationSlug) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const illoMap = new Map(illustrations.map((d) => [d.slug, d]));

    illoMap.delete(illustrationSlug);

    await store.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illoMap.values()],
    });

    return store.get(projectSlug);
  }

  throw new Error(`No such project exists for: ${projectSlug}`);
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

export async function updateStoreValue(key, value) {
  return store.set(key, value);
}

export async function getStoreValue(key) {
  return store.get(key);
}

export { initStore } from './init';
