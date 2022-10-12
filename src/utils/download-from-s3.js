import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

/**
 * Downloads files from an S3 bucket as a
 * `Unit8Array` written to a binary file.
 * @param {Object} opts
 * @param {String} opts.bucket S3 bucket name.
 * @param {String} opts.key S3 key path to download file from.
 */
export async function downloadS3Object({
  bucket,
  key,
} = {}) {
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  /**
   * @type {import('@aws-sdk/client-s3').GetObjectCommandInput}
   */
  const inputParams = {
    Bucket: bucket,
    Key: key,
  };

  const command = new GetObjectCommand(inputParams);
  const response = await s3.send(command);

  const res = new Response(response.Body);

  const buffer = await res.arrayBuffer();

  return new Uint8Array(buffer);
}