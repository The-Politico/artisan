import { HeadObjectCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

/**
 * Retrieves metadata of a specific file in an S3 bucket.
 *
 * @param {object} obj - The parameters of the S3 object
 * @param {string} obj.bucket - The name of the S3 bucket.
 * @param {string} obj.key - The key (path) of the file in the S3 bucket.
 * @returns {Promise<object>} A promise that resolves to the
 *  metadata of the file if successful.
 */
export default async function list({ bucket, key } = {}) {
  const client = await getClient();

  if (!client) {
    return undefined;
  }

  const listCommand = new HeadObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return client.send(listCommand);
}
