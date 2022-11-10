import { ListObjectsCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default function list({ bucket, prefix, delimiter } = {}) {
  const client = getClient();

  const listCommand = new ListObjectsCommand({
    Bucket: bucket,
    Delimiter: delimiter,
    Prefix: prefix,
  });

  return client.send(listCommand);
}
