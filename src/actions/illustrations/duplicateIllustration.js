import { copyFile } from '@tauri-apps/api/fs';
import store from '../../store';
import ids from '../../utils/ids';
import shareProject from '../projects/shareProject';
import getIllustrationFilePath
  from '../../utils/paths/getIllustrationFilePath';
import getIllustrationPath from '../../utils/paths/getIllustrationPath';
import ensureDir from '../../utils/fs/ensureDir';

export default async function duplicateIllustration(
  sourceId,
  projectId,
  illoName,
) {
  // Create new ID
  const destinationId = ids.generate({
    project: projectId,
    illustration: illoName,
  });

  // Derive paths
  const sourcePath = await getIllustrationFilePath(sourceId);
  const destinationDir = await getIllustrationPath(destinationId);
  const destinationPath = await getIllustrationFilePath(destinationId);

  // Copy on file system
  await ensureDir(destinationDir);
  await copyFile(sourcePath, destinationPath);

  // Update store
  await store.illustrations.updateDict({
    [destinationId]: {
      lastGeneratedVersion: {
        $set: null,
      },
      lastGeneratedDate: {
        $set: null,
      },
      lastPublishedDate: {
        $set: null,
      },
    },
  });

  // Update share page
  await shareProject(projectId);

  return destinationId;
}
