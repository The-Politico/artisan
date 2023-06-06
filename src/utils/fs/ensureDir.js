import { createDir } from '@tauri-apps/api/fs';
import { sep } from '@tauri-apps/api/path';

/**
 * Creates a path of directories if they don't exist.
 *
 * @param {...*} args - The arguments to be passed to the `createDir` function
 *  from Tauri
 * @throws {Error} - Throws an error if `createDir` fails for
 * reasons other than the directory already existing.
 */
export default async function ensureDir(dirPath) {
  const directories = dirPath.split(sep);

  async function createDirGracefully(dir) {
    try {
      await createDir(dir);
    } catch (error) {
      if (error.toString().endsWith('File exists (os error 17)')) {
        return;
      }

      if (
        error
          .toString()
          .startsWith('path not allowed on the configured scope:')
      ) {
        return;
      }

      throw error;
    }
  }

  async function createIdxDirectory(idx) {
    await createDirGracefully(directories.slice(0, idx).join(sep));

    if (directories.length > idx) {
      await createIdxDirectory(idx + 1);
    }
  }

  return createIdxDirectory(1);
}
