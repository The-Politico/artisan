import { readBinaryFile } from '@tauri-apps/api/fs';
import { join } from '@tauri-apps/api/path';
import {
  ARCHIVE_PROJECTS_DIRECTORY,
  FALLBACK_IMG_NAME,
  PUBLISH_EMBED_PATH,
} from '../constants/paths';
import { AWS_ARTISAN_BUCKET, AWS_STAGING_BASE_URL } from '../constants/aws';
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
export default async function backupFiles(projectSlug, { files } = {}) {
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

    const { illustrations } = await store.getProject(projectSlug);
    const { name } = illustrations.find((d) => d.slug === file);
    const publicUrl = await join(
      AWS_STAGING_BASE_URL,
      PUBLISH_EMBED_PATH,
      projectSlug,
      file,
      FALLBACK_IMG_NAME,
    );

    return s3.upload({
      bucket: AWS_ARTISAN_BUCKET,
      body: content,
      key: keyPath,
      storageClass: 'STANDARD',
      metadata: {
        name,
        publicUrl,
      },
    });
  };

  // Upload project folder with metadata
  const uploadProjectFolderMeta = async () => {
    const keyPath = await join(ARCHIVE_PROJECTS_DIRECTORY, projectSlug);
    const { name } = await store.getProject(projectSlug);

    return s3.upload({
      bucket: AWS_ARTISAN_BUCKET,
      body: name,
      key: `${keyPath}/`, // slash indicates folder creation
      contentType: 'application/x-directory',
      metadata: {
        name,
      },
    });
  };

  // Use either manually passed file names or all in directory
  const illoNames = await getIllosFromProject(projectSlug, {});
  const filesToUpload = files || illoNames;

  await uploadProjectFolderMeta();
  try {
    await Promise.all(filesToUpload.map(handleUpload));
  } catch (error) {
    console.error(error);
  }

  return store.updateProject(projectSlug, {
    isUploaded: true,
    lastUploaded: new Date().toISOString(),
  });
}
