/* eslint-disable import/prefer-default-export */
import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { PROJECTS_ARCHIVE_PREFIX } from '../../constants/paths';

async function getProjects() {
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  const listCommand = new ListObjectsCommand({
    Bucket: import.meta.env.VITE_AWS_BACKUP_BUCKET_NAME,
    Delimiter: '/',
    Prefix: 'interactives/uploads/',
  });

  const data = await s3.send(listCommand);

  console.log(data);
}

export { getProjects };
