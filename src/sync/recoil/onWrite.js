import atoms from '../../atoms';

const WRITE_MAP = atoms.sync.write;

/**
 * Writes data to the store based on a list of differences
 *
 * @function
 * @param {Object} options - The options for the write function.
 * @param {Map} options.diff - The differences in the recoil store
 * @throws {Error} - Throws an error if no write map
 *  exists for the given item key.
 */
export default function onWrite({ diff }) {
  diff.forEach((value, itemKey) => {
    const [itemKeyBase, ...itemKeyDetails] = itemKey.split('__');

    if (typeof (WRITE_MAP[itemKeyBase]) === 'function') {
      return WRITE_MAP[itemKeyBase](value, ...itemKeyDetails);
    }

    throw new Error(`No write map for ${itemKey}`);
  });
}
