import { readDir, createDir, copyFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';

import store from '../store';

export default async function duplicateProject(
  originalProjectSlug,
  newProjectSlug,
) {
  const workingDir = await store.getWorkingDir();
  const originalProjectPath = await join(
    workingDir,
    originalProjectSlug,
  );

  const newProjectPath = await join(
    workingDir,
    newProjectSlug,
  );

  await createDir(newProjectPath);

  const entries = await readDir(
    originalProjectPath, { recursive: true },
  );

  await Promise.all(entries.map((entry) => {
    if ('children' in entry) {
      return Promise.all(entry.children.map(async (child) => {
        if (child.name.includes('.ai')) {
          const illoSlug = child.name.split('.ai')[0];
          const illoDir = await join(newProjectPath, illoSlug);
          await createDir(illoDir);

          const newFilePath = await join(illoDir, child.name);
          copyFile(child.path, newFilePath);
        }
      }));
    }

    return null;
  }));

  store.addProject(newProjectSlug);
}
