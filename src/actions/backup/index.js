/* eslint-disable import/prefer-default-export */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { readBinaryFile, readDir } from '@tauri-apps/api/fs';
import { join, resolve } from '@tauri-apps/api/path';
import { PROJECTS_ARCHIVE_PREFIX } from '../../constants/paths';
import { getProject, getStoreValue, updateProject } from '../../store';

/**
 * By default, will upload all .ai files found in a project folder
 * to the S3 staging bucket
 * @param {String} projectName Project slug for directory path
 * @param {Object} opts
 * @param {String[]} [opts.files] Adobe Illustartor file names
 * WITHOUT the extension (e.g. `['illo-one', 'illo-two']`)
 */
async function backupFilesS3(projectSlug, { files } = {}) {
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  const projectsFolderPath = await getStoreValue('projectsFolder');

  // Path to project folder
  const projectPath = await resolve(projectsFolderPath, projectSlug);

  const projectFiles = await readDir(projectPath);

  // Removes .DS_store and any hidden files
  // Returns array of illustration names without extensions
  const fileNames = projectFiles
    .filter(({ name }) => name.substring(0, 1) !== '.')
    .map((d) => d.name);

  const bucket = import.meta.env.VITE_AWS_BACKUP_BUCKET_NAME;

  // Upload handler for .ai files
  const handleUpload = async (file) => {
    const filePath = await join(projectPath, file, `${file}.ai`);
    const content = await readBinaryFile(filePath);

    const keyPath = await join(
      PROJECTS_ARCHIVE_PREFIX,
      projectSlug,
      `${file}.ai`,
    );

    try {
      /**
       * @type {import('@aws-sdk/client-s3').PutObjectCommandInput}
       */
      const params = {
        Bucket: bucket,
        Body: content,
        Key: keyPath,
        StorageClass: 'STANDARD',
      };
      const uploadCommand = new PutObjectCommand(params);
      return await s3.send(uploadCommand);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Uploader for project name text file
  const uploadProjectName = async () => {
    try {
      const keyPath = await join(
        PROJECTS_ARCHIVE_PREFIX,
        projectSlug,
        'project-name.txt',
      );
      const { name } = await getProject(projectSlug);
      const params = {
        Bucket: bucket,
        Body: name,
        Key: keyPath,
        ContentType: 'text/plain',
        StorageClass: 'STANDARD',
      };
      const uploadCommand = new PutObjectCommand(params);
      await s3.send(uploadCommand);
    } catch (e) {
      console.error(e);
    }
  };

  try {
    // Use either manually passed file names or all in directory
    const filesToUpload = files || fileNames;

    await Promise.all(filesToUpload.map(handleUpload));
    await uploadProjectName();
    return await updateProject(projectSlug, {
      isUploaded: true,
      lastUploaded: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export { backupFilesS3 };
