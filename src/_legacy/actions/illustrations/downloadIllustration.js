import { writeBinaryFile } from '@tauri-apps/api/fs';
import store from '../../store';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import {
  STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE,
} from '../../constants/statuses';
import ensureDir from '../../utils/fs/ensureDir';
import s3 from '../../utils/s3';
import getEtag from '../../utils/fs/getEtag';
import getIllustrationStatus from '../../actions/illustrations/getIllustrationStatus';
import getIllustrationPath from '../../utils/paths/getIllustrationPath';
import getIllustrationKey from '../../utils/paths/getIllustrationKey';
import getIllustrationFilePath
  from '../../utils/paths/getIllustrationFilePath';

const DOWNLOADABLE_STATUSES = [
  STATUS_ILLUSTRATION_DOWNLOAD_AVAILABLE,
];

/**
 * @deprecated
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
  const aiPath = await getIllustrationFilePath(id);
  const illoPath = await getIllustrationPath(id);
  const status = await getIllustrationStatus(id);
  const illoKey = getIllustrationKey(id);

  // Don't download if a download isn't available
  // (unless the force flag is on)
  if (DOWNLOADABLE_STATUSES.indexOf(status) === -1 && !force) {
    return false;
  }

  await ensureDir(illoPath);

  const byteArray = await s3.download({
    key: illoKey,
    bucket: AWS_ARTISAN_BUCKET,
  });

  await writeBinaryFile(
    aiPath,
    byteArray,
  );

  const fileVersion = await getEtag(aiPath);
  await store.illustrations.updateDict({
    [id]: {
      lastUploadedVersion: {
        $set: fileVersion,
      },
      lastUploadedDate: {
        $set: (new Date()).toISOString(),
      },
      lastPublishedDate: {
        $set: null,
      },
      lastGeneratedDate: {
        $set: null,
      },
    },
  });

  return true;
}
