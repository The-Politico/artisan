import { removeDir } from '@tauri-apps/api/fs';
import store from '../store';
import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';

/**
 * Deletes a project from the user's computer. Also removes
 * all references of the project from the settings store.
 * This also delete all associated illustrations.
 * @param {String} projectSlug Project slug name (e.g. `my-new-project`)
 */
export default async function deleteProject(projectSlug) {
  const projectDir = await getWorkingProjectPath(projectSlug);

  await removeDir(projectDir, { recursive: true });
  await store.removeProject(projectSlug);
}
