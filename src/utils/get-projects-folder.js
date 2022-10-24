import { documentDir, join } from '@tauri-apps/api/path';

import { PROJECTS_FOLDER } from '../constants/buckets';

export default async function getProjectsFolder() {
  const docsPath = await documentDir();
  const path = await join(docsPath, PROJECTS_FOLDER);
  return path;
}
