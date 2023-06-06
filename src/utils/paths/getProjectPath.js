import { resolve } from '@tauri-apps/api/path';
import { LOCAL_PROJECTS_DIRECTORY } from '../../constants/paths';
import store from '../../store';

/**
 * Returns the resolved path of a project's directory inside
 * the working directory.
 * @param {string} id - The identifier for the project.
 *
 * @returns {Promise<string>} - The resolved path of the project's directory.
 */
export default async function getProjectPath(id) {
  const workingDirectory = await store.settings.get('working-directory');
  return resolve(
    workingDirectory,
    LOCAL_PROJECTS_DIRECTORY,
    id,
  );
}
