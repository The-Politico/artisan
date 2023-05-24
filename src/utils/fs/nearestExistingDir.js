import { sep } from '@tauri-apps/api/path';
import { exists } from '@tauri-apps/api/fs';

export default async function nearestExistingDir(dirPath) {
  const directories = dirPath.split(sep);

  async function checkPath(idx) {
    if (idx === -1) {
      return undefined;
    }

    const pathToCheck = directories.slice(0, idx).join(sep);
    const pathExists = await exists(pathToCheck);
    if (pathExists) {
      return pathToCheck;
    }

    return checkPath(idx - 1);
  }

  return checkPath(directories.length - 1);
}
