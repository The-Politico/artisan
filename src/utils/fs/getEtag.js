import { invoke } from '@tauri-apps/api/tauri';

/**
 * Retrieves the ETag for a specified file path
 *
 * @param {string} path - The path of the file for which to get the ETag
 * @returns {Promise<strong>} - A Promise that resolves to the ETag
 */
export default function getEtag(path) {
  return invoke('get_etag', {
    path,
  });
}
