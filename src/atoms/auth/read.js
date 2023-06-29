import store from '../../store';

/**
 * Gets the user's active settings
 * @function
 * @returns {Object}
 */
export default async function readSettings() {
  const settingsEntries = await store.auth.get();
  return Object.fromEntries(settingsEntries);
}
