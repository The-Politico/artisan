/* eslint-disable import/prefer-default-export */
import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { PROJECTS_ARCHIVE_PREFIX } from '../../constants/paths';
import { getStoreValue } from '../../store';

export async function getProjectsArchive() {
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

  // compare to projects in store
  const localProjects = await getStoreValue('projects') || [];

  // Return projects not locally in the settigns store
  return projectsList.filter((p) => !localProjects.includes(p));
}
