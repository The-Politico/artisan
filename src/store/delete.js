import { assertion } from '@recoiljs/refine';

import { MAP } from './init';
import { TYPE_STORE_NAME } from '../constants/types';

/**
 * Deletes a value from a store
 *
 * @param {string} storeName - The name of the store to
 *  retrieve the value from.
 * @param {string} [key] - The key of the value to
 *  retrieve from the store. Optional.
 *
 * @returns {Promise<void>| * | Error>} - A promise
 *  that resolves when the key is deleted
 *
 * @throws {Error} - An error if storeName is not a valid string.
 */
export default async function deleteValue(storeName, key) {
  assertion(TYPE_STORE_NAME)(storeName);

  const store = MAP[storeName];

  return store.delete(key);
}
