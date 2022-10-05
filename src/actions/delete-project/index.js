import { removeDir } from '@tauri-apps/api/fs';
import { resolve } from '@tauri-apps/api/path';
import { Store } from 'tauri-plugin-store-api';

async function deleteProject(projectName) {
  const store = new Store('.settings');
  const projectsFolder = await store.get('projectsFolder');

  const projectPath = await resolve(projectsFolder, projectName);

  try {
    await removeDir(projectPath, { recursive: true });
  } catch (e) {
    console.error(e);
  }
}

export { deleteProject };
