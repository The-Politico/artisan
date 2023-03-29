import store from '../../store';

/**
 * Gets the user's active settings
 * @function
 * @returns {Object}
 */
export default async function onReadSettings() {
  const settingsEntries = await store.settings.get();
  return Object.fromEntries(settingsEntries);
}
