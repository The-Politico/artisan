import { readDir } from '@tauri-apps/api/fs';
import getWorkingDir from '../../store/operations/getWorkingDir';

export default async function getLocalProjects() {
  const workingDir = await getWorkingDir();

  const projects = await readDir(workingDir, {
    recursive: true,
  });

  return projects
    .filter((p) => !!p.children)
    .map((p) => ({
      slug: p.name,
      illustrations: p.children
        .filter((i) => !!i.children)
        .map((i) => i.name),
    }));
}
