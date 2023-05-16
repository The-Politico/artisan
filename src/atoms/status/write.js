/**
 * Does nothing, we need a function because of how the listeners are
 * set up, but we don't want to do anything special on writing
 * to this atom
 */
export default async function onWriteStatus() {
  return undefined;
}
