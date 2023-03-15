import { renameFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';

import store from '../store';

export default async function renameProject(projectSlug, newName) {
  const { slug } = await store.renameProject({
    slug: projectSlug,
    name: newName,
  });

  const projectsFolder = await store.getWorkingDir();
  const projectFolder = await join(projectsFolder, projectSlug);

  await renameFile(
    projectFolder,
    await join(projectsFolder, slug),
  );
}
