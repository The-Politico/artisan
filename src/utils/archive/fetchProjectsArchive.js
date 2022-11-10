/* eslint-disable import/prefer-default-export */
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import store from '../../store';
import s3 from '../s3';

export default async function fetchProjectsArchive() {
  const projectsPrefixes = s3.list({
    bucket: AWS_ARTISAN_BUCKET,
    prefix: ARCHIVE_PROJECTS_DIRECTORY,
  });

  const projectsList = projectsPrefixes.CommonPrefixes.map((d) => {
    const path = d.Prefix;
    return path.replace(ARCHIVE_PROJECTS_DIRECTORY, '').replace('/', '');
  });

  // compare to projects in store
  const localProjects = (await store.getProjectsList()) || [];

  // Return projects not locally in the settigns store
  return projectsList.filter((p) => !localProjects.includes(p));
}
