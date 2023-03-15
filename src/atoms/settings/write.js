import store from '../../store';

/**
 * Updates the data for a user's active settings
 * @function
 * @param {Object} value - The new settings
 * @returns {Promise}
 */
export default async function onWriteSettings(value) {
  await store.settings.set(value);
}
