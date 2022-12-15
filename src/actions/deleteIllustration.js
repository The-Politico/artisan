import { confirm } from '@tauri-apps/api/dialog';
import { removeDir } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import store from '../store';
import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';

export default async function deleteIllustration(
  projectSlug,
  illustrationSlug,
) {
  const projectFolder = await getWorkingProjectPath(projectSlug);
  const illustrationDirPath = await join(projectFolder, illustrationSlug);

  const confirmed = await confirm(
    'This will delete the Adobe Illustrator file from your computer.'
     + ' Are you sure?',
    { title: 'Delete illustration', type: 'warning' },
  );

  if (confirmed) {
    await removeDir(illustrationDirPath, { recursive: true });
    await store.removeIllustration({ projectSlug, illustrationSlug });
  }
}
