import { readBinaryFile } from '@tauri-apps/api/fs';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../../utils/s3';
import { STATUS_ILLUSTRATION_OK } from '../../constants/statuses';
import getIllustrationData from './getIllustrationData';

/**
 * @deprecated
 * Rename an illustration by updating its metadata in S3 storage
 *
 * @param {string} id - The unique identifier of the illustration
 * @param {string} name - The new name to give the illustration
 * @returns {Promise<boolean>} - A promise that resolves to true
 *  if the renaming is successful or false otherwise.
 */
export default async function renameIllustration(id, name) {
  const {
    status,
    paths,
  } = await getIllustrationData(id);

  if (status !== STATUS_ILLUSTRATION_OK) {
    // TODO: Should probabaly throw an error
    return false;
  }

  const content = await readBinaryFile(paths.filePath);
  await s3.upload({
    bucket: AWS_ARTISAN_BUCKET,
    body: content,
    key: paths.key,
    storageClass: 'STANDARD',
    metadata: {
      id,
      name,
    },
  });

  return true;
}
