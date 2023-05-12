import { resolve } from '@tauri-apps/api/path';
import getProjectPath from './getProjectPath';
import idToSlugs from '../ids/idToSlugs';

/**
 * Returns the resolved path of an illustration's directory inside
 * the working directory.
 * @param {string} id - The identifier for the illustration
 *
 * @returns {Promise<string>} - The resolved path of the
 *  illustration's directory
 */
export default async function getIllustrationPath(id) {
  const slugs = idToSlugs(id);

  const projectPath = await getProjectPath(slugs.project);

  return resolve(
    projectPath,
    slugs.illustration,
  );
}
