import { resolve } from '@tauri-apps/api/path';
import getIllustrationPath from './getIllustrationPath';
import idToSlugs from '../ids/idToSlugs';

/**
 * Returns the resolved path of an illustration's AI file inside
 * the working directory.
 * @param {string} id - The identifier for the illustration
 *
 * @returns {Promise<string>} - The resolved path of the
 *  illustration's directory
 */
export default async function getIllustrationFilePath(id) {
  const slugs = idToSlugs(id);

  const illoFile = `${slugs.illustration}.ai`;
  const illoPath = await getIllustrationPath(id);

  return resolve(
    illoPath,
    illoFile,
  );
}
