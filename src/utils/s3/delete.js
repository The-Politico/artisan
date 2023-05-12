import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default async function deleteObject({
  bucket,
  key,
}) {
  const client = getClient();

  const commandInput = {
    Bucket: bucket,
    Key: key,
  };

  const command = new DeleteObjectCommand(commandInput);
  await client.send(command);
}
