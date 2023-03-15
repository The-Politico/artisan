import store from '../../store';
import entriesToObject from '../../utils/entriesToObject';

/**
 * Gets the data for an active preview
 * @function
 * @returns {Object}
 */
export default async function onReadPreview() {
  const previewEntries = await store.preview.get();
  return entriesToObject(previewEntries);
}
