import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export default async function downloadTemplate() {

  const config = {
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  };
  const input = {
    Bucket: import.meta.env.VITE_AWS_BACKUP_BUCKET_NAME,
    Delimiter: '/',
    Prefix: PROJECTS_ARCHIVE_PREFIX,
  };

  const s3Client = new S3Client(config);
  const command = new GetObjectCommand(input);
  const response = await s3Client.send(command);

}