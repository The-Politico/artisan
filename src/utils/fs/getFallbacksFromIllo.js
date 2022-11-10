import { readDir } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import getWorkingProjectPath from '../paths/getWorkingProjectPath';

export default async function getFallbacksFromIllo(projectSlug, illoSlug) {
  const projectPath = await getWorkingProjectPath(projectSlug);
  const illoPath = join(
    projectPath,
    illoSlug,
  );
  const illoDirContents = await readDir(illoPath, { recursive: true });

  const fallbackPaths = [];
  illoDirContents.forEach((content) => {
    if (content.children) {
      content.children.forEach((child) => {
        if (child.name === 'fallback.png') {
          fallbackPaths.push(child.path);
        }
      });
    }
  });

  return fallbackPaths;
}
