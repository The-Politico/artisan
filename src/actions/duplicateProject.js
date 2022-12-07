import { readDir, createDir, copyFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';

import runPromisesSequentially from '../utils/runPromisesSequentially';
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

  const illos = await Promise.all(entries.map((entry) => {
    if ('children' in entry) {
      return Promise.all(entry.children.map(async (child) => {
        if (child.name.includes('.ai')) {
          const illoSlug = child.name.split('.ai')[0];
          const illoDir = await join(newProjectPath, illoSlug);
          await createDir(illoDir);

          const newFilePath = await join(illoDir, child.name);
          await copyFile(child.path, newFilePath);
          return illoSlug;
        }
        return null;
      }));
    }

    return null;
  }));

  const illosToAdd = illos.flat().filter((d) => d);

  await store.addProject(newProjectSlug);
  // Add illos to store one by one
  await runPromisesSequentially(illosToAdd.map(
    (illustrationName) => () => store.addIllustration(
      { projectSlug: newProjectSlug, illustrationName },
    ),
  ));
}
