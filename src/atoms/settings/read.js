import store from '../../store';
import entriesToObject from '../../utils/entriesToObject';

/**
 * Gets the user's active settings
 * @function
 * @returns {Object}
 */
export default async function onReadSettings() {
  const settingsEntries = await store.settings.get();
  return entriesToObject(settingsEntries);
}
