import { PROJECTS } from '../init';

/**
 * Returns a project for a given `key` or `null` if the project doesn't exist.
 * @param {String} key
 * @returns {Promise<T | null>}
 */
export default async function getProject(key) {
  return PROJECTS.get(key);
}
