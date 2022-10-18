import { ListObjectsCommand } from '@aws-sdk/client-s3';
import { createDir, writeBinaryFile } from '@tauri-apps/api/fs';
import { basename, join } from '@tauri-apps/api/path';
import { s3Client } from '../../utils/s3-client';
import {
  PROJECTS_ARCHIVE_PREFIX,
  AWS_BACKUP_BUCKET_NAME,
} from '../../constants/paths';
import {
  addIllustration,
  addProject,
  getProject,
  getStoreValue,
} from '../../store';
import { downloadS3Object } from '../../utils/download-from-s3';
import { fetchProjectMeta } from './project-meta';

export async function downloadProject(projectSlug) {
  const bucket = AWS_BACKUP_BUCKET_NAME;

  const keyPath = await join(PROJECTS_ARCHIVE_PREFIX, projectSlug);
  const projectListCommand = new ListObjectsCommand({
    Bucket: bucket,
    Prefix: keyPath,
  });

  // Grabs file names in project folder
  const { Contents } = await s3Client.send(projectListCommand);
  const files = await Promise.all(
    Contents.map(async (d) => {
      const name = await basename(d.Key, '.ai');
      return {
        illoName: name,
        key: d.Key,
      };
    }),
  );

  // Gets text file for project name
  // This should be a JSON file that stores
  // the illustration names as well
  const projectName = await fetchProjectMeta(files);
  await addProject(projectName, { isUploaded: true });

  // Start of downloading illustrator files
  const projectsFolder = await getStoreValue('projectsFolder');
  const projectPath = await join(projectsFolder, projectSlug);

  try {
    const illos = await Promise.all(
      files
        .filter(({ illoName }) => illoName !== 'project-name.txt')
        .map(async ({ key, illoName }) => {
          const destination = await join(projectPath, illoName);
          const illoPath = await join(destination, `${illoName}.ai`);
          const byteArray = await downloadS3Object({
            key,
            bucket,
          });
          await createDir(destination, { recursive: true });
          await writeBinaryFile(illoPath, byteArray);
          return illoName;
        }),
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const illustrationName of illos) {
      // eslint-disable-next-line no-await-in-loop
      await addIllustration({ projectSlug, illustrationName });
    }
    return getProject(projectSlug);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
