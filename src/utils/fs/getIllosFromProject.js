import { readDir } from '@tauri-apps/api/fs';
import getWorkingProjectPath from '../paths/getWorkingProjectPath';

export default async function getIllosFromProject(
  projectSlug,
  { asPath = false } = {},
) {
  const projectsFolder = await getWorkingProjectPath(projectSlug);
  const dirContents = await readDir(projectsFolder, { recursive: true });

  const illos = [];
  dirContents.forEach((item) => {
    if ('children' in item) {
      if (asPath) {
        illos.push(item.path);
      } else {
        const slug = item.path.split(`/${projectSlug}/`)[1];
        illos.push(slug);
      }
    }
  });

  return illos;
}
