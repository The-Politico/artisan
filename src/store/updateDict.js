/* eslint-disable consistent-return */
import { assertion } from '@recoiljs/refine';
import updateImmutibly from 'immutability-helper';
import { ENTITIES } from './constants';
import {
  TYPE_ENTITY_STORE_ITEM,
} from '../constants/types';

/**
 * Runs an immutability update on a specific key in a dictionary store
 * This is to easily change one value without having to provide the
 * entire entries value in the update call
 *
 * @param {string} storeName - The name of the store to set the value for.
 * @param {object} updates - An object with keys being store IDs and values
 * being a valid immutability-helper update
 *
 * @returns {Promise<void>} - A promise that resolves when the
 *  store has been updated.
 *
 * @throws {Error} - An error if the storeName is not referencing a valid
 * dictionary store (i.e. a store whose values are objects)
 */
export default async function updateDict(
  storeName,
  updates,
  { save = true } = {},
) {
  if (storeName !== 'entities') {
    throw new Error(
      'updateKey can only be used with dictionary stores. Please update '
      + 'non-dictionary stores with the set function.',
    );
  }

  await Promise.all(
    Object.entries(updates)
      .map(async ([key, value]) => {
        const data = await ENTITIES.get(key);

        const update = updateImmutibly(data || {}, value);

        assertion(TYPE_ENTITY_STORE_ITEM)(update);

        ENTITIES.set(key, update);
      }),
  );

  if (save) {
    await ENTITIES.save();
  }
}
