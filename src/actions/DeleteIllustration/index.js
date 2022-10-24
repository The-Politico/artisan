import { removeDir } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';

import * as store
  from '../../store/operations/illustration-remove';

import getProjectsFolder from '../../utils/get-projects-folder';

export default async function DeleteIllustration(
  projectSlug,
  illustrationSlug,
) {
  const projectsFolder = await getProjectsFolder();
  const illustrationDirPath = await join(
    projectsFolder,
    projectSlug,
    illustrationSlug,
  );

  await removeDir(illustrationDirPath, { recursive: true });
  await store.removeIllustration({ projectSlug, illustrationSlug });
}
