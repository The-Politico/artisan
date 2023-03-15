import { basename } from '@tauri-apps/api/path';
import s3 from '../s3';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';

/**
 * Returns metadata from the archive for an illustration with the given key.
 *
 * @param {string} key - The key of the illustration in S3.
 * @returns {Promise<Object>} - A Promise that resolves with the
 *  metadata of the illustration.
 */
async function getMeta(key) {
  const {
    Metadata,
    LastModified,
  } = await s3.head({
    bucket: AWS_ARTISAN_BUCKET,
    key,
  });

  const slug = await basename(key, '.ai');
  return {
    name: Metadata.name,
    slug,
    publicUrl: Metadata.publicurl,
    id: Metadata.id,
    lastUpdated: LastModified.toISOString(),
  };
}

export async function fetchIlloMeta(illosList) {
  const { Contents: list } = illosList;
  const keys = list.filter(({ Key }) => Key.includes('.ai')).map((x) => x.Key);
  return Promise.all(keys.map(getMeta));
}
