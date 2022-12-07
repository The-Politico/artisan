import { PutObjectCommand } from '@aws-sdk/client-s3';
import getClient from './getClient';

export default async function upload({
  bucket,
  key,
  body,
  contentType,
  storageClass = 'STANDARD',
  metadata,
}) {
  const client = getClient();

  const commandInput = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    StorageClass: storageClass,
    Metadata: metadata,
  };

  const command = new PutObjectCommand(commandInput);
  await client.send(command);
}
