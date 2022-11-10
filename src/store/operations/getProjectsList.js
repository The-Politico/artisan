import { STORE } from '../init';
import { PROJECTS_LIST_NAME } from '../constants';

/**
 * Returns the list of projects stored locally
 * @returns {Promise<T | null>}
 */
export default async function getProjectsList() {
  return STORE.get(PROJECTS_LIST_NAME);
}
