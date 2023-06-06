import { removeDir } from '@tauri-apps/api/fs';
import getProjectPath from '../../utils/paths/getProjectPath';

/**
 * @deprecated
 */
export default async function archiveProject(id) {
  const projectPath = await getProjectPath(id);

  await removeDir(projectPath, { recursive: true });

  return true;
}
