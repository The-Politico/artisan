import { join } from '@tauri-apps/api/path';
import { readDir } from '@tauri-apps/api/fs';

import getProjectsFolder from './get-projects-folder';

export default async function getLocalIlloSlugs(projectSlug) {
  const projectsFolder = await getProjectsFolder();
  const fallbackDir = await join(projectsFolder, projectSlug);
  const dirContents = await readDir(fallbackDir, { recursive: true });

  const illos = [];

  dirContents.forEach((item) => {
    if ('children' in item) {
      illos.push(item.path.split(`/${projectSlug}/`)[1]);
    }
  });

  return illos;
}
