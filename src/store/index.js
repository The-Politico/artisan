import { store, projects } from './init';

export * from './operations';
export { updateAppSettings } from './update-settings';

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
    await store.set(key, value);
    await store.save();
    return store.get(key);
  }
  return null;
}

/**
 * Returns value for a given `key` or `null` if the key doesn't exist.
 * @param {String} key
 * @returns {Promise<T | null>}
 */
export async function getStoreValue(key) {
  return store.get(key);
}

/**
 * Returns a project for a given `key` or `null` if the project doesn't exist.
 * @param {String} key
 * @returns {Promise<T | null>}
 */
 export async function getProject(key) {
  return projects.get(key);
}