import { removeDir } from '@tauri-apps/api/fs';
import getProjectPath from '../paths/getProjectPath';

export default async function archiveProject(id) {
  const projectPath = await getProjectPath(id);

  await removeDir(projectPath, { recursive: true });

  return true;
}
