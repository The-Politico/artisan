import store from '../../store';

/**
 * Gets the user's auth config
 * @function
 * @returns {Object}
 */
export default async function readSettings() {
  const settingsEntries = await store.auth.get();
  return Object.fromEntries(settingsEntries);
}
