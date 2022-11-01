import { createDir, removeDir } from '@tauri-apps/api/fs';
import { resolve, homeDir as getHomeDir } from '@tauri-apps/api/path';

import store from '../store';

export default async function initialize() {
  const homeDir = await getHomeDir();
  const defaultWorkingDir = await resolve(homeDir, 'Artisan');

  await store.stores.STORE.reset();
  await store.stores.PROJECTS.reset();

  await store.updateSettings({
    authorName: 'Polly Politico',
    authorEmail: 'ppolitico@politico.com',
    workingDir: defaultWorkingDir,
    preferredPort: '8765',
  });

  await removeDir(defaultWorkingDir, { recursive: true });
  await createDir(defaultWorkingDir);
}