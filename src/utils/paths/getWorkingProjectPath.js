import { resolve } from '@tauri-apps/api/path';
import store from '../../store';

/**
 * Returns the resolved path of a project's directory inside
 * the working directory.
 * @param {string} projectSlug - The unique slug for the project.
 *
 * @returns {Promise<string>} - The resolved path of the project's directory.
 */
export default async function getWorkingProjectPath(projectSlug) {
  const projectsFolderPath = await store.settings.get('working-directory');

  return resolve(projectsFolderPath, projectSlug);
}
