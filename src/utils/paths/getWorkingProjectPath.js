import { resolve } from '@tauri-apps/api/path';
import store from '../../store';

export default async function getWorkingProjectPath(projectSlug) {
  const projectsFolderPath = await store.getWorkingDir();
  return resolve(projectsFolderPath, projectSlug);
}
