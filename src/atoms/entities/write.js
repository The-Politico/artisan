/**
 * Throws an error because this atom shouldn't be written to
 * outside of a sync
 * @function
 */
export default async function onWriteEntities() {
  throw new Error('The entities atom is read-only.');
}
