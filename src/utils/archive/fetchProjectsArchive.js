/* eslint-disable import/prefer-default-export */
import { ARCHIVE_PROJECTS_DIRECTORY } from '../../constants/paths';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';
import s3 from '../s3';
import fetchProjectMeta from './fetchProjectMeta';

export default async function fetchProjectsArchive() {
  const params = {
    bucket: AWS_ARTISAN_BUCKET,
    delimiter: '/',
    prefix: `${ARCHIVE_PROJECTS_DIRECTORY}/`,
  };

  const projectsPrefixes = await s3.list(params);

  const slugs = projectsPrefixes?.CommonPrefixes.map((d) => {
    const path = d.Prefix;
    return path.replace(`${ARCHIVE_PROJECTS_DIRECTORY}/`, '').replace('/', '');
  });

  return Promise.all(
    slugs.map(async (slug) => ({
      slug,
      ...fetchProjectMeta(slug),
    })),
  );
}
