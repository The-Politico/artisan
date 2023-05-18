/* eslint-disable consistent-return */
import { assertion } from '@recoiljs/refine';
import { SETTINGS, ENTITIES, PREVIEW } from './constants';
import {
  TYPE_STORE_NAME,
  TYPE_SETTINGS_STORE_KEYS,
  TYPE_ILLUSTRATION_STORE_ITEM,
  TYPE_PREVIEW_STORE_KEYS,
} from '../constants/types';

/**
 * Sets the value of a store by name.
 *
 * @param {string} storeName - The name of the store to set the value for.
 * @param {object} values - An object of key-value pairs to update
 *  in the store.
 *
 * @returns {Promise<void>} - A promise that resolves when the
 *  store has been updated.
 *
 * @throws {Error} - An error if the storeName is not a valid string
 *  or if the values do not match the schema defined in the corresponding
 *  store type.
 */
export default async function set(storeName, values, { save = true } = {}) {
  assertion(TYPE_STORE_NAME)(storeName);

  if (storeName === 'settings') {
    Object.entries(values).forEach(([key, value]) => {
      if (!(key in TYPE_SETTINGS_STORE_KEYS)) {
        throw new Error(`Invalid key supplied for settings store update: "${key}"`);
      }

      assertion(TYPE_SETTINGS_STORE_KEYS[key])(value);

      SETTINGS.set(key, value);
    });

    if (save) {
      await SETTINGS.save();
    }

    return;
  }

  if (storeName === 'entities') {
    Object.entries(values).forEach(([key, value]) => {
      assertion(TYPE_ILLUSTRATION_STORE_ITEM)(value);

      ENTITIES.set(key, value);
    });

    if (save) {
      await SETTINGS.save();
    }

    return;
  }

  if (storeName === 'preview') {
    Object.entries(values).forEach(([key, value]) => {
      if (!(key in TYPE_PREVIEW_STORE_KEYS)) {
        throw new Error(`Invalid key supplied for preview store update: "${key}"`);
      }

      assertion(TYPE_PREVIEW_STORE_KEYS[key])(value);

      PREVIEW.set(key, value);
    });

    if (save) {
      await SETTINGS.save();
    }
  }
}
