import { basename } from '@tauri-apps/api/path';
import s3 from '../s3';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';

/**
 * Returns metadata from the archive for an illustration with a given slug
 *
 * @param {string} projectSlug - The slug of the project
 * @param {string} illustrationSlug - The slug of the illustration
 * @returns {Promise<Object>} - A Promise that resolves with the
 *  metadata of the illustration.
 */
export async function fetchIlloMetaFromSlug(projectSlug, illustrationSlug) {
  const {
    Metadata,
    LastModified,
    ETag,
  } = await s3.head({
    bucket: AWS_ARTISAN_BUCKET,
    key: [
      ARCHIVE_PROJECTS_DIRECTORY,
      projectSlug,
      `${illustrationSlug}.ai`,
    ].join('/'),
  });

  return {
    name: Metadata.name,
    slug: illustrationSlug,
    publicUrl: Metadata.publicurl,
    id: Metadata.id,
    lastUpdated: LastModified.toISOString(),
    version: ETag.split('"')[1],
  };
}

/**
 * Returns metadata from the archive for an illustration with the given key.
 *
 * @param {string} key - The key of the illustration in S3.
 * @returns {Promise<Object>} - A Promise that resolves with the
 *  metadata of the illustration.
 */
export async function fetchIlloMetaFromKey(key) {
  const {
    Metadata,
    LastModified,
    ETag,
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
    version: ETag.split('"')[1],
  };
}

/**
 * This function fetches metadata for Illustration files from a
 * given list of S3 metadata objects
 *
 * @param {Object} illosList - A list of objects containing illustration
 *  file keys among other details.
 * @param {String} illosList.Key - An AWS key name
 * @returns {Promise<Object[]>} - A Promise that resolves when all
 *  metadata has been fetched.
 */
export async function fetchIlloListMeta(illosList) {
  const { Contents: list } = illosList;
  const keys = list.filter(({ Key }) => Key.includes('.ai')).map((x) => x.Key);
  return Promise.all(keys.map(fetchIlloMetaFromKey));
}
