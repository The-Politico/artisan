import { CopyObjectCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default async function copy({
  bucket,
  key,
  source,
}) {
  const client = getClient();

  const commandInput = {
    Bucket: bucket,
    Key: key,
    CopySource: `${bucket}/${source}`,
  };

  const command = new CopyObjectCommand(commandInput);
  await client.send(command);
}
