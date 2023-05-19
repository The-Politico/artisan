import { assertion } from '@recoiljs/refine';
import {
  MAP, SETTINGS, ENTITIES, PREVIEW,
} from './constants';

import { TYPE_STORE_NAME } from '../constants/types';

/**
 * Resets a (or all) of the stores to proper defaults
 *
 * @param {string=} storeName - The name of the store to
 *  retrieve the value from.
 * @returns {Promise<void>| * | Error>} - A promise
 *  that resolves when the store(s) is reset
 *
 * @throws {Error} - An error if storeName
 *  is suplied and is not a valid name.
 */
export default async function reset(storeName) {
  if (storeName) {
    assertion(TYPE_STORE_NAME)(storeName);
    const store = MAP[storeName];
    await store.reset();
    return;
  }

  await Promise.all([
    SETTINGS.reset(),
    ENTITIES.reset(),
    PREVIEW.reset(),
  ]);
}
