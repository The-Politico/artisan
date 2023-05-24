/* eslint-disable consistent-return */
import { assertion } from '@recoiljs/refine';
import { MAP } from './init';
import { TYPE_STORE_NAME } from '../constants/types';
import set from './set';

/**
 * Sets multiple values in a given store
 *
 * @param {string} storeName - The name of the store to set the value for.
 * @param {object[]} batches - An array of objects that are key-value
 *  pairs to update in the store.
 *
 * @returns {Promise<void>} - A promise that resolves when the
 *  store has been updated with all the batches
 */
export default async function batchSet(storeName, batches) {
  assertion(TYPE_STORE_NAME)(storeName);
  const store = MAP[storeName];

  await Promise.all(batches.map((batch) => set(
    storeName,
    batch,
    { save: false },
  )));

  await store.save();
}
