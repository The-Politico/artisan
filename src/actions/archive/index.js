import { backupFilesS3 } from '../backup';
import { deleteProject } from '../delete-project';

export async function archiveProject(projectSlug) {
  await backupFilesS3(projectSlug);
  await deleteProject(projectSlug);
}
