import { resolve } from '@tauri-apps/api/path';
import { AI2HTML_OUTPUT_DIR, FALLBACK_IMG_NAME } from '../../constants/paths';
import getProjectPath from './getProjectPath';

/**
 * Returns the resolved path of an illustration's generated fallback
 * image
 * @param {string} projectSlug - The unique slug for the illustration's
 *  project
 * @param {string} illustrationSlug - The unique slug for the illustration
 *
 * @returns {Promise<string>} - The resolved path of the
 *  illustration's fallback image
 */
export default async function getLocalFallbackPath(
  projectSlug,
  illustrationSlug,
) {
  const projectPath = await getProjectPath(projectSlug);

  return resolve(
    projectPath,
    illustrationSlug,
    AI2HTML_OUTPUT_DIR,
    FALLBACK_IMG_NAME,
  );
}
