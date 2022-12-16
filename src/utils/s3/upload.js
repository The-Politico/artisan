import { PutObjectCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default async function upload({
  bucket,
  key,
  body,
  contentType,
  storageClass = 'STANDARD',
}) {
  const client = getClient();

  const commandInput = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    StorageClass: storageClass,
  };

  const command = new PutObjectCommand(commandInput);
  await client.send(command);
}
