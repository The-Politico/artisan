import { exists, readBinaryFile } from '@tauri-apps/api/fs';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../../utils/s3';
import store from '../../store';
import {
  STATUS_ILLUSTRATION_VALID_UPLOAD,
  STATUS_ILLUSTRATION_ARCHIVED,
} from '../../constants/statuses';
import getIllustrationStatus from './getIllustrationStatus';
import getIllustrationKey from '../../utils/paths/getIllustrationKey';
import getEtag from '../../utils/fs/getEtag';
import getIllustrationFilePath
  from '../../utils/paths/getIllustrationFilePath';
import getLocalFallbackPath from '../../utils/paths/getLocalFallbackPath';
import getPreviewKey from '../../utils/paths/getPreviewKey';
import shareProject from '../projects/shareProject';
import ids from '../../utils/ids';

/**
 * @deprecated
 * Backup an illustration to an Amazon S3 bucket
 *
 * @param {string} id - The ID of the illustration
 * @param {Object} options - Backup options
 * @param {boolean} [options.force=false] - Whether to force the upload
 *  regardless of the illustration's status
 *
 * @returns {Promise<boolean>} A promise that resolves to true if the
 *  backup was successful, false otherwise
 */
export default async function backupIllustration(
  id,
  {
    force = false,
  } = {},
) {
  const status = await getIllustrationStatus(id);
  const illoPath = await getIllustrationFilePath(id);
  const fallbackPath = await getLocalFallbackPath(id);

  const previewKey = await getPreviewKey(id);
  const illoKey = await getIllustrationKey(id);
  const version = await getEtag(illoPath);

  // If the file doesn't exist, you can't upload anything
  if (status === STATUS_ILLUSTRATION_ARCHIVED) {
    return false;
  }

  // Don't upload if the status isn't valid update
  // (unless the force flag is on)
  if (status !== STATUS_ILLUSTRATION_VALID_UPLOAD && !force) {
    return false;
  }

  // Get the file infomation
  const content = await readBinaryFile(illoPath);

  // Upload AI File
  await s3.upload({
    bucket: AWS_ARTISAN_BUCKET,
    body: content,
    key: illoKey,
    storageClass: 'STANDARD',
  });

  // Upload Fallback Preview
  const fallbackExists = await exists(fallbackPath);
  if (fallbackExists) {
    const fallbackContent = await readBinaryFile(fallbackPath);
    await s3.upload({
      bucket: AWS_ARTISAN_BUCKET,
      body: fallbackContent,
      key: previewKey,
      storageClass: 'STANDARD',
    });
  }

  // Update latest version uploaded
  await store.illustrations.updateDict({
    [id]: {
      lastUploadedVersion: {
        $set: version,
      },
      lastUploadedDate: {
        $set: (new Date()).toISOString(),
      },
    },
  });
  await store.illustrations.refreshId(id);

  // Update share page
  const { project: projectId } = ids.parse(id);
  await shareProject(projectId);

  return true;
}
