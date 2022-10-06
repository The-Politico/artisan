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
    Prefix: PROJECTS_ARCHIVE_PREFIX,
  });

  const projectsPrefixes = await s3.send(listCommand);

  const projectsList = projectsPrefixes.CommonPrefixes.map((d) => {
    const path = d.Prefix;
    return path.replace(PROJECTS_ARCHIVE_PREFIX, '').replace('/', '');
  });

  return projectsList;
}

export { getProjects };
