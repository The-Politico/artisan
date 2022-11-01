import { STORE, PROJECTS } from './init';

import addIllustration from './operations/addIllustration';
import addProject from './operations/addProject';
import getPreview from './operations/getPreview';
import getProject from './operations/getProject';
import getProjectsList from './operations/getProjectsList';
import getSettings from './operations/getSettings';
import getWorkingDir from './operations/getWorkingDir';
import removeIllustration from './operations/removeIllustration';
import removeProject from './operations/removeProject';
import updateIllustration from './operations/updateIllustration';
import updatePreview from './operations/updatePreview';
import updateProject from './operations/updateProject';
import updateSettings from './operations/updateSettings';

<<<<<<< HEAD
/**
 * @typedef {import('./types').Key} Key
 */

/**
 * Arbitrary convenience function to set a store value of a given key
 * Defaults to safe set only. Use `override: true` to unsafely set a new value
 * for any key.
 * @param {Key} key
 * @param {*} value
 * @param {Object} [opts]
 * @param {Boolean} [opts.override] Override safety check of existing key
 * @returns {Promise | null}
 */
export async function updateStoreValue(key, value, { override = false } = {}) {
  const hasKey = await store.has(key);
  if (!hasKey || override) {
    await store.set(key, value);
    await store.save();
    return store.get(key);
  }
  return null;
}

/**
 * Returns value for a given `key` or `null` if the key doesn't exist.
 * @param {Key} key
 * @returns {Promise<T | null>}
 */
export async function getStoreValue(key) {
  return store.get(key);
}

/**
 * Returns a project for a given `key` or `null` if the project doesn't exist.
 * @param {String} key
 * @returns {Promise<T | null>}
 */
export async function getProject(key) {
  return projects.get(key);
}
=======
export default {
  addIllustration,
  addProject,
  getPreview,
  getProject,
  getProjectsList,
  getSettings,
  getWorkingDir,
  removeIllustration,
  removeProject,
  updateIllustration,
  updatePreview,
  updateProject,
  updateSettings,

  stores: {
    STORE,
    PROJECTS,
  },
};
>>>>>>> 8b476586ef1a17a2307ec3cdfaef13b0da35f1c3
