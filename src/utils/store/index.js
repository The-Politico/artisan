import { initStore } from './init';

export * from './operations/project';
export * from './operations/illustration';

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

export async function updateStoreValue(key, value) {
  return store.set(key, value);
}

export async function getStoreValue(key) {
  return store.get(key);
}

export { initStore } from './init';
