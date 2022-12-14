import { removeDir } from '@tauri-apps/api/fs';
import { confirm } from '@tauri-apps/api/dialog';
import store from '../store';
import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';

/**
 * Deletes a project from the user's computer. Also removes
 * all references of the project from the settings store.
 * This also delete all associated illustrations.
 * @param {String} projectSlug Project slug name (e.g. `my-new-project`)
 */
export default async function deleteProject(
  projectSlug,
  { isAfterArchive = false } = {},
) {
  const projectDir = await getWorkingProjectPath(projectSlug);

  let confirmed;

  if (!isAfterArchive) {
    confirmed = await confirm(
      'This will delete the project from your computer and all'
      + ' associated illustrator files. Are you sure?',
      { title: 'Delete Project', type: 'warning' },
    );
  }

  if (confirmed || isAfterArchive) {
    await removeDir(projectDir, { recursive: true });
    await store.removeProject(projectSlug);
  }
}
