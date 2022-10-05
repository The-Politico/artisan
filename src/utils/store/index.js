import { initStore } from './init';

export * from './operations/project';
export * from './operations/illustration';

const store = initStore();

/**
 * Updates Artisan settings for user's Name, Email and the Projects Folder
 * @param {Object} settings
 * @param {String} [settings.authorName] First and last name
 * @param {String} [settings.authorEmail] \@politico.com email address
 * @param {String} [settings.projectsFolder] Folder where Artisan projects will
 * be stored. Defaults to `$HOME/Artisan/Projects`
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
 * Arbitrary convenience function to set a store value of a given key
 * Defaults to safe set only. Use `override: true` to unsafely set a new value
 * for any key.
 * @param {String} key
 * @param {*} value
 * @param {Object} [opts]
 * @param {Boolean} [opts.override] Override safety check of existing key
 * @returns {Promise | null}
 */
export async function updateStoreValue(key, value, { override = false } = {}) {
  const hasKey = await store.has(key);
  if (!hasKey || override) {
    return store.set(key, value);
  }
  return null;
}

/**
 * Returns value for a given `key` or `null` if they key doesn't exist.
 * @param {String} key
 * @returns {Promise<T | null>}
 */
export async function getStoreValue(key) {
  return store.get(key);
}

export { initStore } from './init';
