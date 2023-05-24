import { GetObjectCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

/**
 * Downloads files from an S3 bucket as a
 * `Uint8Array` written to a binary file.
 * @param {Object} opts
 * @param {String} opts.bucket S3 bucket name.
 * @param {String} opts.key S3 key path to download file from.
 * @return {Uint16Array} Byte array for writing to binary file
 */
export default async function downloadS3Object({
  bucket,
  key,
  responseContentType,
} = {}) {
  const client = await getClient();

  if (!client) {
    return undefined;
  }

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
    ResponseContentType: responseContentType,
  });

  const { Body } = await client.send(command);

  const response = new window.Response(Body);

  if (responseContentType === 'text/plain') {
    return response.text();
  }

  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}
