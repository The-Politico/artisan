import { ListObjectsCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default async function list({ bucket, prefix, delimiter } = {}) {
  const client = await getClient();

  if (!client) {
    return undefined;
  }

  const listCommand = new ListObjectsCommand({
    Bucket: bucket,
    Delimiter: delimiter,
    Prefix: prefix,
  });

  return client.send(listCommand);
}
