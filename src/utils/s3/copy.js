import { CopyObjectCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default async function copy({
  bucket,
  key,
  source,
}) {
  const client = await getClient();

  if (!client) {
    return false;
  }

  const commandInput = {
    Bucket: bucket,
    Key: key,
    CopySource: `${bucket}/${source}`,
  };

  const command = new CopyObjectCommand(commandInput);
  await client.send(command);
  return true;
}
