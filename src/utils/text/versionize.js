/**
 * Returns a version number based on the current timestamp.
 *
 * @returns {string} - The version number.
 */
export default function versionize() {
  const now = new Date();
  return `${now.getTime()}`.padStart(15, 0);
}
