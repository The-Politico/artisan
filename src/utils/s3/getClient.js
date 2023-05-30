import { S3Client } from '@aws-sdk/client-s3';
import { SETTINGS } from '../../store/init';

/**
 * Load the credentials from the settings in store
 * @returns {Object}
 */
async function getAwsCredentials() {
  // Using the raw store instead of the interface because of
  // circular import logic
  return {
    accessKeyId: await SETTINGS.get('aws-id'),
    secretAccessKey: await SETTINGS.get('aws-secret'),
  };
}

/**
 * Get the AWS S3 client instance for sending commands
 * @returns {S3Client}
 */
export default async function getClient() {
  const credentials = await getAwsCredentials();

  if (!credentials.accessKeyId || !credentials.secretAccessKey) {
    return undefined;
  }

  const s3Client = new S3Client({
    region: 'us-east-1',
    credentials,
  });

  return s3Client;
}
