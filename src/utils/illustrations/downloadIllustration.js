import { writeBinaryFile } from '@tauri-apps/api/fs';
import store from '../../store';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import getIllustrationData from './getIllustrationData';
import {
  STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE,
  STATUS_ILLUSTRATION_ARCHIVED,
} from '../../constants/statuses';
import ensureDir from '../fs/ensureDir';
import s3 from '../s3';
import getEtag from '../fs/getEtag';

const DOWNLOADABLE_STATUSES = [
  STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE,
  STATUS_ILLUSTRATION_ARCHIVED,
];

/**
 * Downloads an illustration.
 *
 * @param {string} id - The illustration ID.
 * @param {Object} [options] - Configuration options for the download process.
 * @param {boolean} [options.force=false] - Whether to force the download
 *  regardless of the illustration's status
 *
 * @return {Promise<boolean>} Returns true if the illustration is
 *  downloaded successfully, otherwise false.
 */
export default async function downloadIllustration(
  id,
  { force = false } = {},
) {
  const {
    meta,
    status,
    paths,
  } = await getIllustrationData(id);

  // Don't download if a download isn't available
  // (unless the force flag is on)
  if (DOWNLOADABLE_STATUSES.indexOf(status) === -1 && !force) {
    return false;
  }

  await ensureDir(paths.dir);

  const byteArray = await s3.download({
    key: paths.key,
    bucket: AWS_ARTISAN_BUCKET,
  });

  await writeBinaryFile(
    paths.filePath,
    byteArray,
  );

  const fileVersion = await getEtag(paths.filePath);
  await store.entities.set({
    [id]: {
      ...meta,
      lastUploadedVersion: fileVersion,
    },
  });

  return true;
}
