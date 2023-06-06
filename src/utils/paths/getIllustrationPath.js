import { resolve } from '@tauri-apps/api/path';
import getProjectPath from './getProjectPath';
import ids from '../ids';

/**
 * Returns the resolved path of an illustration's directory inside
 * the working directory.
 * @param {string} id - The identifier for the illustration
 *
 * @returns {Promise<string>} - The resolved path of the
 *  illustration's directory
 */
export default async function getIllustrationPath(id) {
  const names = ids.parse(id);

  const projectPath = await getProjectPath(names.project);

  return resolve(
    projectPath,
    names.illustration,
  );
}
