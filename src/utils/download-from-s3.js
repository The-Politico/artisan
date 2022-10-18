import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from './s3-client';

/**
 * Downloads files from an S3 bucket as a
 * `Uint8Array` written to a binary file.
 * @param {Object} opts
 * @param {String} opts.bucket S3 bucket name.
 * @param {String} opts.key S3 key path to download file from.
 * @return {Uint16Array} Byte array for writing to binary file
 */
export async function downloadS3Object({ bucket, key } = {}) {
  const s3Client = getS3Client();

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    const { Body } = await s3Client.send(command);

    const res = new window.Response(Body);

    const buffer = await res.arrayBuffer();

    return new Uint8Array(buffer);
  } catch (error) {
    console.error(error);
    return null;
  }
}
