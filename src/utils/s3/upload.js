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
  console.log('Utils / S3 / Upload / Line 12');
  const client = await getClient();

  if (!client) {
    return false;
  }

  console.log('Utils / S3 / Upload / Line 19');
  const commandInput = {
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: contentType,
    StorageClass: storageClass,
    Metadata: metadata,
  };

  const command = new PutObjectCommand(commandInput);
  const resp = await client.send(command);
  console.log('Utils / S3 / Upload / Line 31');
  console.log(resp);

  return true;
}
