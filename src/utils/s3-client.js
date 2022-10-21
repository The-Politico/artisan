import { S3Client } from '@aws-sdk/client-s3';

/**
 * Place holder function when we figure out credentials
 */
function getAwsCredentials() {
  return {
    accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  };
}

/**
 * Get the AWS S3 client instance for sending commands
 * @todo Figure out how to load AWS credentials for users without an .env
 * @returns {S3Client}
 */
export function getS3Client() {
  const credentials = getAwsCredentials();
  const s3Client = new S3Client({
    region: 'us-east-1',
    credentials,
  });
  return s3Client;
}
