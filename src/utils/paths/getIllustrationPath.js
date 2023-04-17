import { resolve } from '@tauri-apps/api/path';
import getProjectPath from './getProjectPath';

/**
 * Returns the resolved path of an illustration's directory inside
 * the working directory.
 * @param {string} projectSlug - The unique slug for the illustration's
 *  project
 * @param {string} illustrationSlug - The unique slug for the illustration
 *
 * @returns {Promise<string>} - The resolved path of the
 *  illustration's directory
 */
export default async function getIllustrationPath(
  projectSlug,
  illustrationSlug,
) {
  const illoFile = `${illustrationSlug}.ai`;
  const projectPath = await getProjectPath(projectSlug);

  return resolve(
    projectPath,
    illustrationSlug,
    illoFile,
  );
}
