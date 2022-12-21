/* eslint-disable import/prefer-default-export */
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../s3';
import { fetchIlloMeta } from './fetchIlloMeta';

export default async function fetchProjectsArchive() {
  const params = {
    bucket: AWS_ARTISAN_BUCKET,
    delimiter: '/',
    prefix: `${ARCHIVE_PROJECTS_DIRECTORY}/`,
  };

  const projectsPrefixes = await s3.list(params);

  const projectSlugs = projectsPrefixes?.CommonPrefixes.map((d) => {
    const path = d.Prefix;
    return path.replace(`${ARCHIVE_PROJECTS_DIRECTORY}/`, '').replace('/', '');
  });

  const projectsWithIllos = await Promise.all(
    projectSlugs.map(async (d) => {
      const illosList = await s3.list({
        bucket: AWS_ARTISAN_BUCKET,
        prefix: `${ARCHIVE_PROJECTS_DIRECTORY}/${d}/`,
      });
      const illos = await fetchIlloMeta(illosList);
      return {
        slug: d,
        illos,
      };
    }),
  );

  return projectsWithIllos;
}
