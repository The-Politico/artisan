import { join } from '@tauri-apps/api/path';
import { createDir } from '@tauri-apps/api/fs';
import store from '../store';

export default async function createProject(projectName) {
  const projectsFolder = await store.getWorkingDir();

  const project = await store.addProject(projectName, { method: 'create' });

  const projPath = await join(
    projectsFolder,
    project.slug,
  );

  await createDir(projPath);

  return project;
}
