import store from '../../store';

/**
 * Gets the data for an active preview
 * @function
 * @returns {Object}
 */
export default async function onReadPreview() {
  const previewEntries = await store.preview.get();
  return Object.fromEntries(previewEntries);
}
