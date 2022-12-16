import { STORE } from '../init';
import { WORKING_DIRECTORY } from '../constants';

/**
 * Returns the list of projects stored locally
 * @returns {Promise<T | null>}
 */
export default async function getWorkingDir() {
  return STORE.get(WORKING_DIRECTORY);
}
