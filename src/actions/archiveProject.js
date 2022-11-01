import backupFiles from './backupFiles';
import deleteProject from './deleteProject';

export default async function archiveProject(projectSlug) {
  await backupFiles(projectSlug);
  await deleteProject(projectSlug);
}
