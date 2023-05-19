import atoms from '../../atoms';

const READ_MAP = atoms.sync.read;

/**
 * Reads data from the store based on the item key and returns
 * the data if found.
 *
 * @function
 * @param {string} itemKey - The key of the item to read from the store.
 * @returns {*} - The data read from the store.
 *
 * @throws {Error} - Throws an error if no read map exists
 * for the given item key.
 */
export default function onRead(itemKey) {
  const [itemKeyBase, ...itemKeyDetails] = itemKey.split('__');

  if (typeof (READ_MAP[itemKeyBase]) === 'function') {
    return READ_MAP[itemKeyBase](...itemKeyDetails);
  }

  throw new Error(`No read map for ${itemKey}`);
}
