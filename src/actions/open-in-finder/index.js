/* eslint-disable import/prefer-default-export */
import { open } from '@tauri-apps/api/shell';
import { resolve } from '@tauri-apps/api/path';
import { getStoreValue } from '../../store';

/**
 * Opens projet folder in Finder
 * @param {String} projectName - Project slug name (e.g. `my-project-name`)
 */
async function openInFinder(projectName) {
  const projectsFolder = await getStoreValue('projectsFolder');
  const projectPath = await resolve(projectsFolder, projectName);
  await open(projectPath);
}

export { openInFinder };
