import { readDir } from '@tauri-apps/api/fs';

/**
 * Checks if the path resolves to a directory or not
 * If the path doesn't exist, it does it's best to guess
 * whether that path is likely to be a directory or not
 * due to the presence of an extension
 *
 * @param {string} path - A path to check
 * @throws {Error} - Throws an error if `readDir` fails for
 * unexpected reasons
 */
export default async function isDir(path) {
  try {
    await readDir(path);
  } catch (error) {
    if (error.toString().endsWith('No such file or directory (os error 2)')) {
      return path.indexOf('.') === -1;
    }

    if (error.toString().endsWith('Not a directory (os error 20)')) {
      return false;
    }

    throw error;
  }

  return true;
}
