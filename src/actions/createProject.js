import { join } from '@tauri-apps/api/path';
import { createDir } from '@tauri-apps/api/fs';
import slugify from '../utils/text/slugify';
import store from '../store';

export default async function createProject(projectName) {
  const projectsFolder = await store.getWorkingDir();

  const projPath = await join(
    projectsFolder,
    slugify(projectName),
  );

  await createDir(projPath);

  return store.addProject(projectName);
}
