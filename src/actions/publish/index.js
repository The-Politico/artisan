/* eslint-disable no-await-in-loop */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { readBinaryFile, readDir } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import mime from 'mime/lite';
import {
  ARTISAN_OUTPUT_DIR,
  AWS_BACKUP_BUCKET_NAME,
  PROJECTS_ARCHIVE_PREFIX,
} from '../../constants/paths';
import { getProject, getStoreValue } from '../../store';
// import { backupFilesS3 } from '../backup';

export async function publishProject(projectSlug) {
  // await backupFilesS3(projectSlug);
  // await outputSharePage(projectSlug);

  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  const pFolder = await getStoreValue('projectsFolder');
  const project = await getProject(projectSlug);
  const pPath = await join(pFolder, projectSlug);

  const { illustrations } = project;

  await Promise.all(
    illustrations.map(async (d) => {
      const illoSlug = d.slug;
      const outputPath = await join(pPath, illoSlug, ARTISAN_OUTPUT_DIR);
      const output = await readDir(outputPath, { recursive: true });

      await Promise.all(
        output.map(async (file) => {
          const fileContent = await readBinaryFile(file.path);
          const ContentType = mime.getType(file.path);
          const Key = await join(
            PROJECTS_ARCHIVE_PREFIX,
            projectSlug,
            illoSlug,
            file.name,
          );
          const putCommand = new PutObjectCommand({
            Bucket: AWS_BACKUP_BUCKET_NAME,
            StorageClass: 'STANDARD',
            ContentType,
            Body: fileContent,
            Key,
          });
          await s3.send(putCommand);
        }),
      );
    }),
  );
}
