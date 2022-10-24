import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default async function uploadS3Object(bucket, key, fileContents) {
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  const commandInput = {
    Bucket: bucket,
    Key: key,
    Body: fileContents,
    ContentType: 'text/html',

  };

  const command = new PutObjectCommand(commandInput);
  await s3.send(command);
}
