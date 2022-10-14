import { removeDir } from '@tauri-apps/api/fs';
import { resolve } from '@tauri-apps/api/path';
import { getStoreValue, removeProject } from '../../store';

/**
 * Deletes a project from the user's computer. Also removes
 * all references of the project from the settings store.
 * This also delete all associated illustrations.
 * @param {String} projectSlug Project slug name (e.g. `my-new-project`)
 */
async function deleteProject(projectSlug) {
  const projectsFolder = await getStoreValue('projectsFolder');

  const projectPath = await resolve(projectsFolder, projectSlug);

  try {
    await removeDir(projectPath, { recursive: true });
    await removeProject(projectSlug);
  } catch (e) {
    console.error(e);
  }
}

export { deleteProject };
