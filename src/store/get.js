import { assertion } from '@recoiljs/refine';

import { MAP } from './init';
import { TYPE_STORE_NAME } from '../constants/types';

/**
 * Retrieves a value from a store by key or returns all entries in the store.
 *
 * @param {string} storeName - The name of the store to
 *  retrieve the value from.
 * @param {string} [key] - The key of the value to
 *  retrieve from the store. Optional.
 *
 * @returns {Promise<Array<Array<string, Object>| * | Error>} - A promise
 *  that resolves to either all entries in the store or the value associated
 *  with the specified key.
 *
 * @throws {Error} - An error if storeName is not a valid string.
 */
export default async function get(storeName, key) {
  assertion(TYPE_STORE_NAME)(storeName);

  const store = MAP[storeName];

  if (!key) {
    return store.entries();
  }

  return store.get(key);
}
