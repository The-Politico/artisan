import { ListObjectsCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default function list({ bucket, prefix } = {}) {
  const client = getClient();

  const listCommand = new ListObjectsCommand({
    Bucket: bucket,
    Prefix: prefix,
  });

  return client.send(listCommand);
}
