import store from '../../store';

/**
 * Updates the data for an active preview
 * @function
 * @param {Object} value - The values for the updated preview
 * @param {Number} value.process - The process ID for the active process
 * @param {String} value.project - The ID of the active project
 * @returns {Promise}
 */
export default async function onWritePreview(value) {
  await store.preview.set(value);
}
