/* eslint-disable import/prefer-default-export */
import { open } from '@tauri-apps/api/shell';
import { resolve } from '@tauri-apps/api/path';
import { getStoreValue } from '../../store';

/**
 * Opens projet folder in Finder
 * @param {String} projectSlug - Project slug name (e.g. `my-project-name`)
 */
export async function openInFinder(projectSlug) {
  const projectsFolder = await getStoreValue('projectsFolder');
  const projectPath = await resolve(projectsFolder, projectSlug);
  try {
    await open(projectPath);
  } catch (e) {
    console.error(e);
  }
}
