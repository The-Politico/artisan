/* eslint-disable import/prefer-default-export */
import { AWS_ARTISAN_BUCKET } from '../constants/aws';
import { ARCHIVE_PROJECTS_DIRECTORY } from '../constants/paths';
import store from '../store';
import s3 from '../utils/s3';
import fetchProjectsArchive from '../utils/archive/fetchProjectsArchive';

/**
 * Fetches list of projects in the archive by slug name
 * @returns {Array<Object>}
 */
export default async function getProjectsArchive() {
  const projectsList = await fetchProjectsArchive();

  // compare to projects in store
  const localProjects = (await store.getProjectsList()) || [];

  // Return projects not locally in the settigns store
  const archivedProjects = projectsList.filter(
    (p) => !localProjects.includes(p),
  );

  return Promise.all(
    archivedProjects.map(async (d) => {
      const { Metadata } = await s3.head({
        bucket: AWS_ARTISAN_BUCKET,
        key: `${ARCHIVE_PROJECTS_DIRECTORY}/${d}/`,
      });
      return {
        slug: d,
        name: Metadata.name,
      };
    }),
  );
}
