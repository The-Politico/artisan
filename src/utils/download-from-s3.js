import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

/**
 * Downloads files from an S3 bucket as a
 * `Uint8Array` written to a binary file.
 * @param {Object} opts
 * @param {String} opts.bucket S3 bucket name.
 * @param {String} opts.key S3 key path to download file from.
 * @return {Uint16Array} Byte array for writing to binary file
 */
export async function downloadS3Object({ bucket, key } = {}) {
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    const { Body } = await s3.send(command);

    const res = new window.Response(Body);

    const buffer = await res.arrayBuffer();

    return new Uint8Array(buffer);
  } catch (error) {
    console.error(error);
    return null;
  }
}
