import { exists, readBinaryFile } from '@tauri-apps/api/fs';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../s3';
import store from '../../store';
import fetchPreviews from '../archive/fetchPreviews';
import {
  STATUS_ILLUSTRATION_VALID_UPLOAD,
  STATUS_ILLUSTRATION_ARCHIVED,
} from '../../constants/statuses';
import getIllustrationData from './getIllustrationData';

/**
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
  const {
    meta,
    status,
    paths,
  } = await getIllustrationData(id);

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
  const content = await readBinaryFile(paths.filePath);

  // Upload AI File
  await s3.upload({
    bucket: AWS_ARTISAN_BUCKET,
    body: content,
    key: paths.key,
    storageClass: 'STANDARD',
    metadata: {
      id,
      name: meta.name,
    },
  });

  // Upload Fallback Preview
  const fallbackExists = await exists(paths.fallbackPath);
  if (fallbackExists) {
    const fallbackContent = await readBinaryFile(paths.fallbackPath);
    await s3.upload({
      bucket: AWS_ARTISAN_BUCKET,
      body: fallbackContent,
      key: paths.fallbackKey,
      storageClass: 'STANDARD',
    });
    await fetchPreviews();
  }

  // Update latest version uploaded
  await store.entities.set({
    [id]: {
      ...meta,
      lastUploadedVersion: meta.version,
    },
  });

  return true;
}
