import { resolve } from '@tauri-apps/api/path';
import { FALLBACK_IMG_NAME } from '../../constants/paths';
import getIllustrationOutputPath from './getIllustrationOutputPath';

/**
 * Returns the resolved path of an illustration's generated fallback
 * image
 * @param {string} id - The identifier for the illustration
 *
 * @returns {Promise<string>} - The resolved path of the
 *  illustration's fallback image
 */
export default async function getLocalFallbackPath(id) {
  const outputPath = await getIllustrationOutputPath(id);

  return resolve(
    outputPath,
    FALLBACK_IMG_NAME,
  );
}
