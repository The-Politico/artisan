/* eslint-disable import/prefer-default-export */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// import { Upload } from '@aws-sdk/lib-storage';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { join, homeDir } from '@tauri-apps/api/path';
import { PROJECTS_ARCHIVE_PREFIX } from '../../constants/paths';

/**
 * @param {Object} opts
 * @param {String} opts.project Project slug for directory path
 * @param {String[]} opts.files Adobe Illustartor file names
 */
async function backupFilesS3({ project, files }) {
  const homeDirPath = await homeDir();
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  const handleUpload = async (file) => {
    const projectPath = await join(project, file);
    const filePath = await join(homeDirPath, 'Artisan/Projects', projectPath);
    const content = await readBinaryFile(filePath);

    const keyPath = await join(PROJECTS_ARCHIVE_PREFIX, projectPath);
    console.log('Uploading to: ', keyPath);

    try {
      /**
       * @type {import('@aws-sdk/client-s3').PutObjectCommandInput}
       */
      const params = {
        Bucket: import.meta.env.VITE_AWS_BACKUP_BUCKET_NAME,
        Body: content,
        Key: keyPath,
        StorageClass: 'STANDARD',
      };
      const uploadCommand = new PutObjectCommand(params);
      await s3.send(uploadCommand);
    } catch (error) {
      console.error(error);
    }
  };

  try {
    await Promise.all(files.map(handleUpload));
  } catch (error) {
    console.error(error);
  }
}

export { backupFilesS3 };
