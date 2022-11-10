import { join } from '@tauri-apps/api/path';

import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import {
  METADATA_FILE_NAME,
  ARCHIVE_PROJECTS_DIRECTORY,
} from '../../constants/paths';

import s3 from '../s3';

/**
 * @param {String} files Array of file names
 * @return {String} Project display name
 */
export default async function fetchProjectMeta(projectSlug) {
  const keyPath = await join(
    ARCHIVE_PROJECTS_DIRECTORY,
    projectSlug,
    METADATA_FILE_NAME,
  );

  return s3.download({
    bucket: AWS_ARTISAN_BUCKET,
    key: keyPath,
    responseContentType: 'text/plain',
  });
}
