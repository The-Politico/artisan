import { createDir } from '@tauri-apps/api/fs';

/**
 * Creates a directory if it doesn't exist.
 *
 * @param {...*} args - The arguments to be passed to the `createDir` function
 *  from Tauri
 * @throws {Error} - Throws an error if `createDir` fails for
 * reasons other than the directory already existing.
 */
export default async function ensureDir(...args) {
  try {
    await createDir(...args);
  } catch (error) {
    if (error.toString().endsWith('File exists (os error 17)')) {
      return;
    }

    throw error;
  }
}
