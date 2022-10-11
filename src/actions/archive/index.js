import { backupFilesS3 } from '../backup';
import { deleteProject } from '../delete-project';

export async function archiveProject(projectName) {
  await backupFilesS3(projectName);
  await deleteProject(projectName);
}
