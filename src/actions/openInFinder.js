/* eslint-disable import/prefer-default-export */
import { open } from '@tauri-apps/api/shell';
import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';

/**
 * Opens projet folder in Finder
 * @param {String} projectSlug - Project slug name (e.g. `my-project-name`)
 */
export default async function openInFinder(projectSlug) {
  const projectPath = await getWorkingProjectPath(projectSlug);
  await open(projectPath);
}
