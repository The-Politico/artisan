import head from './head';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';

/**
 * Retrieves the ETag of a given object in an Amazon S3 bucket.
 *
 * @param {Object} config - Configuration parameters.
 * @param {string} config.key - The object key whose ETag should be retrieved.
 * @param {string} [config.bucket=AWS_ARTISAN_BUCKET] - Optional parameter to
 *  set the storage bucket name. If not provided,
 *  it defaults to the AWS_ARTISAN_BUCKET
 * @returns {Promise<string>} The etag of the object
 */
export default async function etag({
  bucket = AWS_ARTISAN_BUCKET,
  key,
} = {}) {
  const metadata = await head({ bucket, key });

  if (!metadata) {
    return undefined;
  }

  const { Etag: etagStr } = metadata;

  if (!etagStr) {
    return undefined;
  }

  return etagStr.split('"')[1];
}
