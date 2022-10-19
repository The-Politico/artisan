import { readDir, createDir, copyFile } from '@tauri-apps/api/fs';
import { documentDir, join } from '@tauri-apps/api/path';

import { addProject } from '../../store/operations/project-add';

export default async function DuplicateProject(originalProjectSlug,
  newProjectSlug) {
  const docsPath = await documentDir();
  const originalProjectPath = await join(docsPath, 'Artisan', 'Projects',
    originalProjectSlug);
  const newProjectPath = await join(docsPath, 'Artisan', 'Projects',
    newProjectSlug);
  await createDir(newProjectPath);

  const entries = await readDir(originalProjectPath, { recursive: true });

  await Promise.all(entries.map((entry) => {
    if ('children' in entry) {
      return Promise.all(entry.children.map(async (child) => {
        if (child.name.includes('.ai')) {
          const illoSlug = child.name.slice(0, -3);
          const illoDir = await join(newProjectPath, illoSlug);
          await createDir(illoDir);

          const newFilePath = await join(illoDir, child.name);
          copyFile(child.path, newFilePath);
        }
      }));
    }
    return null;
  }));

  addProject(newProjectSlug);
}
