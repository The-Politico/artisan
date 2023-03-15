/**
 * Converts an array of key-value pairs into an object.
 * @param {Array<Array<string, Object>>} entries - The array of
 *  key-value pairs.
 *
 * @returns {Object} - The resulting object.
 */
export default function entriesToObject(entries) {
  return entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
}
