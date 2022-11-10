import { readBinaryFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import {
  ARCHIVE_PROJECTS_DIRECTORY,
  METADATA_FILE_NAME,
} from '../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../constants/aws';
import store from '../store';
import getWorkingProjectPath from '../utils/paths/getWorkingProjectPath';
import getIllosFromProject from '../utils/fs/getIllosFromProject';
import s3 from '../utils/s3';

/**
 * By default, will upload all .ai files found in a project folder
 * to the S3 staging bucket
 * @param {String} projectName Project slug for directory path
 * @param {Object} opts
 * @param {String[]} [opts.files] Adobe Illustartor file names
 * WITHOUT the extension (e.g. `['illo-one', 'illo-two']`)
 */
export default async function backupFiles(
  projectSlug,
  { files } = {},
) {
  // Path to project folder
  const projectPath = await getWorkingProjectPath(projectSlug);

  // Upload handler for .ai files
  const handleUpload = async (file) => {
    const filePath = await join(projectPath, file, `${file}.ai`);
    const content = await readBinaryFile(filePath);

    const keyPath = await join(
      ARCHIVE_PROJECTS_DIRECTORY,
      projectSlug,
      `${file}.ai`,
    );

    return s3.upload({
      bucket: AWS_ARTISAN_BUCKET,
      body: content,
      key: keyPath,
      storageClass: 'STANDARD',
    });
  };

  // Uploader for project name text file
  const uploadProjectName = async () => {
    const keyPath = await join(
      ARCHIVE_PROJECTS_DIRECTORY,
      projectSlug,
      METADATA_FILE_NAME,
    );
    const { name } = await store.getProject(projectSlug);

    return s3.upload({
      bucket: AWS_ARTISAN_BUCKET,
      body: name,
      key: keyPath,
      contentType: 'text/plain',
    });
  };

  // Use either manually passed file names or all in directory
  const illoNames = await getIllosFromProject(projectSlug, {});
  const filesToUpload = files || illoNames;

  await Promise.all(filesToUpload.map(handleUpload));
  await uploadProjectName();

  return store.updateProject(projectSlug, {
    isUploaded: true,
    lastUploaded: new Date().toISOString(),
  });
}
