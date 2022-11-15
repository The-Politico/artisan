import { S3Client } from '@aws-sdk/client-s3';

/**
 * @type {S3Client}
 * @todo Figure out how to load AWS credentials for users without an .env
 */
export const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  },
});
