/* eslint-disable import/prefer-default-export */
import { ListObjectsCommand } from '@aws-sdk/client-s3';
import { PROJECTS_ARCHIVE_PREFIX } from '../../constants/paths';
import { getStoreValue } from '../../store';
import { getS3Client } from '../../utils/s3-client';

export async function getProjectsArchive() {
  const s3Client = getS3Client();

  const listCommand = new ListObjectsCommand({
    Bucket: import.meta.env.VITE_AWS_BACKUP_BUCKET_NAME,
    Delimiter: '/',
    Prefix: PROJECTS_ARCHIVE_PREFIX,
  });

  const projectsPrefixes = await s3Client.send(listCommand);

  const projectsList = projectsPrefixes.CommonPrefixes.map((d) => {
    const path = d.Prefix;
    return path.replace(PROJECTS_ARCHIVE_PREFIX, '').replace('/', '');
  });

  // compare to projects in store
  const localProjects = await getStoreValue('projects') || [];

  // Return projects not locally in the settigns store
  return projectsList.filter((p) => !localProjects.includes(p));
}
