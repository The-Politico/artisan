import { sep } from '@tauri-apps/api/path';
import { exists } from '@tauri-apps/api/fs';

/**
 * Returns the nearest existing directory in the provided directory path.
 * If no matching directory is found, returns undefined.
 * @param {string} dirPath - A string representing the
 * directory path to check.
 *
 * @returns {Promise<string|undefined>} A promise that
 * resolves to a string representing the nearest existing
 * directory, or undefined if not found.
 */
export default async function nearestExistingDir(dirPath) {
  const directories = dirPath.split(sep);

  async function checkPath(idx) {
    if (idx === -1) {
      return undefined;
    }

    const pathToCheck = directories.slice(0, idx).join(sep);
    const pathExists = await exists(pathToCheck);
    if (pathExists) {
      return pathToCheck;
    }

    return checkPath(idx - 1);
  }

  return checkPath(directories.length - 1);
}
