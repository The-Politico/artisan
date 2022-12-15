import { HeadObjectCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default function list({ bucket, key } = {}) {
  const client = getClient();

  const listCommand = new HeadObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return client.send(listCommand);
}
