import {
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { createDir, writeBinaryFile } from '@tauri-apps/api/fs';
import { basename, join } from '@tauri-apps/api/path';
import { PROJECTS_ARCHIVE_PREFIX } from '../../constants/paths';
import {
  addIllustration,
  addProject,
  getProject,
  getStoreValue,
} from '../../store';
import { downloadS3Object } from '../../utils/download-from-s3';

export async function downloadProject(projectSlug) {
  const bucket = import.meta.env.VITE_AWS_BACKUP_BUCKET_NAME;
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  const keyPath = await join(PROJECTS_ARCHIVE_PREFIX, projectSlug);
  const projectListCommand = new ListObjectsCommand({
    Bucket: import.meta.env.VITE_AWS_BACKUP_BUCKET_NAME,
    Prefix: keyPath,
  });

  // Grabs file names in project folder
  const { Contents } = await s3.send(projectListCommand);
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
  const { key: projectNameFile } = files.find(
    ({ illoName }) => illoName === 'project-name.txt',
  );

  const getTextFile = new GetObjectCommand({
    Bucket: bucket,
    Key: projectNameFile,
    ResponseContentType: 'text/plain',
  });

  const { Body } = await s3.send(getTextFile);
  // eslint-disable-next-line no-undef
  const res = new Response(Body);
  const projectName = await res.text();
  await addProject(projectName);

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
          const arr = await downloadS3Object({
            key,
            bucket,
          });
          await createDir(destination, { recursive: true });
          await writeBinaryFile(illoPath, arr);
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
    return null;
  }
}
